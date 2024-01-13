import { glob } from "glob";
import sharp from "sharp";
import { basename } from "path";

const PIPELINES = {
  avif: [40, 50, 60, 70].map((quality) => ({ quality })),
  webp: [40, 50, 60, 70].map((quality) => ({ quality })),
  jpeg: [40, 50, 60, 70].map((quality) => ({ quality })),
};

const images = Array.from(await glob("src/posts/**/*.jpg")).slice(0, 2);
const promises = images.flatMap(async (image) => {
  const pipeline = sharp(image).resize(768);
  const name = basename(image, ".jpg");
  const referencePath = `image_comparison/${name}-reference.jpg`;
  await pipeline.toFile(referencePath);

  const outputs = Object.keys(PIPELINES).flatMap((format) => {
    return PIPELINES[format].map(async (options) => {
      const serializedOptions = Object.keys(options)
        .map((k) => `${k}_${options[k]}`)
        .join("_");
      const newName = `image_comparison/${name}-${serializedOptions}.${format}`;
      await pipeline.clone()[format](options).toFile(newName);
    });
  });
  await Promise.all(outputs);
});

await Promise.all(promises);
