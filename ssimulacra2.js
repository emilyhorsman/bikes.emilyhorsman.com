import { promisify } from "node:util";
import { exec as exec_ } from "node:child_process";
import sharp from "sharp";
import { tmpName as tmpName_, setGracefulCleanup } from "tmp";
import { stat } from "fs/promises";

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
  await sharp(referenceImagePath).avif(options).toFile(comparisonAvifPath);
  const stats = await stat(comparisonAvifPath);
  return { stats, path: await convertToPNG(comparisonAvifPath) };
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
  console.log({ size: referenceStats.size / (1024 * 1024) });
  const referencePngPath = await convertToPNG(referenceImagePath);
  let qualityLowerBound = 30;
  let qualityUpperBound = 80;
  let score = null;
  for (let safety = 0; safety < 10; safety++) {
    const options = {
      quality: Math.round(
        qualityLowerBound + (qualityUpperBound - qualityLowerBound) / 2
      ),
    };
    console.log({
      qualityLowerBound,
      qualityUpperBound,
      quality: options.quality,
    });
    const { path: comparisonPngPath, stats: comparisonStats } =
      await getAvifPng(referenceImagePath, options);
    score = await compareImages(referencePngPath, comparisonPngPath);
    console.log({ options, score, size: comparisonStats.size / (1024 * 1024) });
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
  console.log({ qualityLowerBound, qualityUpperBound, score });
}

await findAvifQuality(process.argv[2]);
