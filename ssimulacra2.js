import { promisify } from "node:util";
import { exec as exec_ } from "node:child_process";
import sharp from "sharp";
import { tmpName as tmpName_, setGracefulCleanup } from "tmp";
import { stat, readFile, writeFile } from "fs/promises";
import { performance } from "node:perf_hooks";
import { glob } from "glob";
import { createHash } from "crypto";
import * as path from "path";
import { Worker, isMainThread, parentPort, workerData } from "worker_threads";

const exec = promisify(exec_);
const tmpName = promisify(tmpName_);
setGracefulCleanup();

async function convertToPNG(imagePath) {
  const outputPath = await tmpName({ postfix: ".png" });
  await exec(`magick -compress None ${imagePath} ${outputPath}`);
  return outputPath;
}

async function compareImages(referenceImagePath, comparisonImagePath) {
  const { stdout } = await exec(
    `~/src/ssimulacra2/ssimulacra2 ${referenceImagePath} ${comparisonImagePath}`
  );
  return Number(stdout);
}

async function getPng(format, func) {
  const comparisonPath = await tmpName({ postfix: format });
  const startTimeMs = performance.now();
  await func(comparisonPath);
  const endTimeMs = performance.now();
  const stats = await stat(comparisonPath);
  return {
    stats,
    path: await convertToPNG(comparisonPath),
    durationMs: endTimeMs - startTimeMs,
  };
}

async function getAvifPng(referenceImagePath, options) {
  return await getPng(".avif", async (comparisonAvifPath) => {
    await sharp(referenceImagePath).avif(options).toFile(comparisonAvifPath);
  });
}

async function getWebpPng(referenceImagePath, options) {
  return await getPng(".webp", async (comparisonWebpPath) => {
    await sharp(referenceImagePath).webp(options).toFile(comparisonWebpPath);
  });
}

async function findFormatQuality(
  referenceFullSizeImagePath,
  getPngFunc = getAvifPng,
  targetScore = 65,
  tolerance = 1
) {
  const referenceImagePath = await tmpName();
  await sharp(referenceFullSizeImagePath)
    .resize(1536)
    .jpeg({ quality: 90 })
    .toFile(referenceImagePath);
  const referenceStats = await stat(referenceImagePath);
  const referencePngPath = await convertToPNG(referenceImagePath);
  let qualityLowerBound = 30;
  let qualityUpperBound = 80;
  let score = null;
  let comparisonStats = null;
  for (let safety = 0; safety < 10; safety++) {
    const options = {
      quality: Math.round(
        qualityLowerBound + (qualityUpperBound - qualityLowerBound) / 2
      ),
    };
    const { path: comparisonPngPath, ...results } = await getPngFunc(
      referenceImagePath,
      options
    );
    comparisonStats = results.stats;
    score = await compareImages(referencePngPath, comparisonPngPath);
    if (score < targetScore + tolerance && score > targetScore - tolerance) {
      qualityLowerBound = options.quality;
      qualityUpperBound = options.quality;
      break;
    }
    if (score > targetScore) {
      qualityUpperBound = options.quality;
    } else {
      qualityLowerBound = options.quality;
    }
  }
  return {
    quality: qualityUpperBound,
    score,
    size: comparisonStats.size,
    compressionRatio: comparisonStats.size / referenceStats.size,
  };
}

async function compareAvifEffort(referenceFullSizeImagePath) {
  const referenceImagePath = await tmpName();
  await sharp(referenceFullSizeImagePath)
    .resize(1536)
    .jpeg({ quality: 90 })
    .toFile(referenceImagePath);
  const referenceStats = await stat(referenceImagePath);
  console.log({ size: referenceStats.size / (1024 * 1024) });
  const referencePngPath = await convertToPNG(referenceImagePath);
  for (let effort = 0; effort <= 9; effort++) {
    const options = { quality: 60, effort };
    const {
      path: comparisonPngPath,
      stats: comparisonStats,
      durationMs,
    } = await getAvifPng(referenceImagePath, options);
    const score = await compareImages(referencePngPath, comparisonPngPath);
    console.log({
      score,
      effort,
      size: comparisonStats.size / (1024 * 1024),
      durationMs,
    });
  }
}

async function getHash(path) {
  const hash = createHash("sha256");
  hash.update(await readFile(path));
  return hash.digest().toString("hex");
}

async function getSharpData(dir, data) {
  const existingData = JSON.parse(await readFile(data));
  const imagePaths = await glob(`${dir}/**/*.jpg`);
  const results = await Promise.all(
    imagePaths.map(
      (imagePath) =>
        new Promise((resolve, reject) => {
          const worker = new Worker("./ssimulacra2.js", {
            workerData: { imagePath, existingData },
          });
          console.log({ imagePath, threadId: worker.threadId });
          worker.on("message", resolve);
          worker.on("error", reject);
        })
    )
  );

  for (const result of results) {
    if (!result) {
      continue;
    }
    const { name, output, avifResults, webpResults } = result;
    console.log({ name, avifResults, webpResults });
    existingData[name] = output;
  }

  await writeFile(data, JSON.stringify(existingData));
}

async function getSharpDataForPath({ imagePath, existingData }) {
  const hash = await getHash(imagePath);
  const name = path.basename(imagePath);
  if (existingData[name]?.sha256 === hash) {
    return;
  }

  const avifResults = await findFormatQuality(imagePath, getAvifPng);
  const webpResults = await findFormatQuality(imagePath, getWebpPng);
  return {
    name,
    output: {
      sha256: hash,
      avif: {
        quality: avifResults.quality,
      },
      webp: {
        quality: webpResults.quality,
      },
    },
    avifResults,
    webpResults,
  };
}

if (isMainThread) {
  await getSharpData(process.argv[2], process.argv[3]);
} else {
  parentPort.postMessage(await getSharpDataForPath(workerData));
}
