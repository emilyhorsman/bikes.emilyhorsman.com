import { promisify } from "node:util";
import { exec as exec_ } from "node:child_process";
import sharp from "sharp";
import { tmpName as tmpName_, setGracefulCleanup } from "tmp";
import { stat, readFile, writeFile } from "fs/promises";
import { performance } from "node:perf_hooks";
import { glob } from "glob";
import { createHash } from "crypto";
import * as path from "path";

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

async function getAvifPng(referenceImagePath, options) {
  const comparisonAvifPath = await tmpName({ postfix: ".avif" });
  const startTimeMs = performance.now();
  await sharp(referenceImagePath).avif(options).toFile(comparisonAvifPath);
  const endTimeMs = performance.now();
  const stats = await stat(comparisonAvifPath);
  return {
    stats,
    path: await convertToPNG(comparisonAvifPath),
    durationMs: endTimeMs - startTimeMs,
  };
}

async function findAvifQuality(
  referenceFullSizeImagePath,
  targetScore = 65,
  tolerance = 2
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
    const { path: comparisonPngPath, ...results } = await getAvifPng(
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
  for (const imagePath of imagePaths) {
    const hash = await getHash(imagePath);
    const name = path.basename(imagePath);
    if (existingData[name]?.sha256 === hash) {
      continue;
    }
    console.log({ hash, name });

    const avifResults = await findAvifQuality(imagePath);
    existingData[name] = {
      sha256: hash,
      avif: {
        quality: avifResults.quality,
      },
    };
  }

  await writeFile(data, JSON.stringify(existingData));
}

await getSharpData(process.argv[2], process.argv[3]);
