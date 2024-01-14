import ssim from "ssim";
import sharp from "sharp";
import { glob } from "glob";
import { basename } from "path";
import { writeFileSync } from "fs";

const referenceImages = await glob("image_comparison/*-reference.jpeg");
const results = [];

for (const image of referenceImages) {
  const name = basename(image, "-reference.jpeg");
  console.log(name);
  const comparisonImages = (await glob(`image_comparison/${name}-*`)).filter(
    (p) => !p.includes("reference")
  );
  const referenceBuffer = Array.from(
    new Uint8ClampedArray(await sharp(image).raw().toBuffer())
  );
  for (const comparison of comparisonImages) {
    const comparisonBuffer = Array.from(
      new Uint8ClampedArray(await sharp(comparison).raw().toBuffer())
    );
    results.push({
      reference: image,
      comparison,
      result: ssim(referenceBuffer, comparisonBuffer),
    });
  }
}

writeFileSync("output.json", JSON.stringify(results));
