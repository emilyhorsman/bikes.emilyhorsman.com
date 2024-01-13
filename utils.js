import "dotenv/config";

import { glob } from "glob";
import * as path from "path";

export async function getBannerImageSrc(page, data) {
  if (data.banner_image?.src) {
    const naiveSrc = data.banner_image.src;
    return path.join(
      naiveSrc[0] === "/"
        ? data.eleventy.directories.input
        : path.dirname(page.inputPath),
      naiveSrc
    );
  }

  const globPath = path.join(path.dirname(page.inputPath), "*16x9.jpg");
  const files = await glob(globPath);
  if (files.length === 0) {
    return null;
  }
  return files[0];
}

function getImageFilename(src, width, format) {
  const name = path.parse(src).name;
  return `${name}-${width}.${format}`;
}

export function getSharpOptions(data) {
  const options = {
    concurrency: 20,
    sharpAvifOptions: { quality: 45, effort: 6 },
    filenameFormat: function (_, src, width, format) {
      return getImageFilename(src, width, format);
    },
  };

  if (typeof data === "object" && data?.q) {
    options.sharpAvifOptions.quality = data.q;
  }

  if (process.env.USE_CDN_IMAGES?.startsWith("https") ?? false) {
    options.statsOnly = true;
    options.urlFormat = function ({ src, width, format }) {
      const filename = getImageFilename(src, width, format);
      return `${process.env.USE_CDN_IMAGES}/${filename}`;
    };
  }

  return options;
}
