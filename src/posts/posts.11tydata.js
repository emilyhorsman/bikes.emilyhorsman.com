import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import Image, * as EleventyImg from "@11ty/eleventy-img";
import * as path from "path";
import { getBannerImageSrc, getSharpOptions } from "../../utils.js";

const eleventyComputed = {
  postTags: (data) => {
    return data.tags.filter((tag) => tag !== "posts");
  },

  eleventyExcludeFromCollections: (data) => {
    if (data.draft === true && process.env.ELEVENTY_ENV !== "development") {
      return true;
    }
    return data.eleventyExcludeFromCollections;
  },

  permalink: (data) => {
    if (data.draft === true && process.env.ELEVENTY_ENV !== "development") {
      return `/posts/drafts/${uuidv4()}/`;
    }
    return data.permalink;
  },

  banner_image: {
    permalink: async (data) => {
      const src = await getBannerImageSrc(data.page, data);
      if (!src) {
        return "";
      }

      const outputDir = path.join(data.eleventy.directories.output, "img");
      const metadata = await Image(src, {
        widths: [2].map((scale) => 768 * scale),
        formats: ["webp"],
        outputDir,
        ...getSharpOptions(
          data.banner_image,
          path.basename(src),
          data.eleventy.env.root
        ),
      });

      return `${metadata.webp[0].url}`;
    },
  },
};

export default {
  layout: "post.liquid",
  tags: ["posts"],
  eleventyComputed,
};
