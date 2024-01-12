import "dotenv/config";

import * as Sass from "sass";
import Image, * as EleventyImg from "@11ty/eleventy-img";
import * as path from "path";
import MarkdownIt from "markdown-it";
import MarkdownItFootnote from "markdown-it-footnote";
import { getBannerImageSrc, getSharpOptions } from "./utils.js";
import posthtml from "posthtml";
import posthtmlMinifyClassnames from "posthtml-minify-classnames";
import yaml from "js-yaml";
import htmlnano from "htmlnano";

const mdLib = MarkdownIt({
  html: true,
  typographer: true,
  linkify: true,
})
  .use(markdownLink)
  .use(MarkdownItFootnote);
mdLib.renderer.rules.footnote_caption = renderFootnoteCaption;

export default (c) => {
  c.addFilter("css", function (value) {
    return Sass.compileString(value).css;
  });

  c.addTransform("posthtml", async function (content, outputPath) {
    if (!outputPath.endsWith(".html")) {
      return content;
    }

    const result = await posthtml()
      .use(eagerFirstImagesPlugin)
      .use(
        posthtmlMinifyClassnames({
          removeUnfound: true,
          genNameId: false,
          genNameClass:
            process.env.ELEVENTY_ENV === "development" ? "genName" : false,
        })
      )
      .use(
        htmlnano({
          collapseWhitespace: "aggressive",
          removeComments: "all",
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          removeOptionalTags: true,
          minifyJs: false,
          minifySvg: false,
          removeUnusedCss: {},
        })
      )
      .process(content);
    return result.html;
  });

  c.addShortcode("image", image);
  c.addShortcode("bannerimage", bannerImage);

  // set instead of amend because we want to use the instance elsewhere.
  c.setLibrary("md", mdLib);
  c.addFilter("markdown", (content) => mdLib.renderInline(content));
  c.addFilter("markdownblock", (content) => mdLib.render(content));

  c.addFilter("filteredTags", (collection) => {
    const tagsWithCount = {};
    for (const item of collection) {
      (item.data.tags ?? []).forEach((tag) => {
        if (["all", "posts"].includes(tag)) {
          return;
        }

        if (!tagsWithCount[tag]) {
          tagsWithCount[tag] = 0;
        }
        tagsWithCount[tag]++;
      });
    }

    return Object.keys(tagsWithCount).sort(
      (a, b) => tagsWithCount[b] - tagsWithCount[a]
    );
  });

  c.addFilter("groupByYear", (collection) => {
    return Array.from(
      Map.groupBy(collection, (item) => item.date.getFullYear()).entries()
    ).toSorted((a, b) => b[0] - a[0]);
  });

  c.addPassthroughCopy({ passthrough: "." });
  c.addPassthroughCopy({ "passthrough/img": "img" });
  c.addWatchTarget("passthrough");

  c.addDataExtension("yaml", (contents) => yaml.load(contents));

  return {
    dir: {
      input: "src",
    },
  };
};

function markdownLink(md) {
  md.renderer.rules.link_open = (
    tokens,
    index,
    rendererOptions,
    _,
    renderer
  ) => {
    if (tokens[index].attrGet("href").startsWith("http")) {
      tokens[index].attrSet("target", "_blank");
    }

    return renderer.renderToken(tokens, index, rendererOptions);
  };
}

async function image(naiveSrc, altOrOptions, photoCredit = false, width = 768) {
  const src = path.join(
    naiveSrc[0] === "/"
      ? this.eleventy.directories.input
      : path.dirname(this.page.inputPath),
    naiveSrc
  );
  const outputDir = path.join(this.eleventy.directories.output, "img");

  const htmlOptions = {};
  let imageData = {};
  if (typeof altOrOptions === "string") {
    htmlOptions.alt = altOrOptions;
  } else {
    imageData = altOrOptions[path.basename(naiveSrc)];
    htmlOptions.alt = imageData.alt;
  }
  const sharpOptions = getSharpOptions(imageData);

  const metadata = await Image(src, {
    widths: [1, 1.5, 2].map((scale) => width * scale),
    formats: ["avif", "webp"],
    outputDir,
    ...sharpOptions,
  });
  const linkedImage = await Image(src, {
    widths: ["auto"],
    formats: ["webp"],
    outputDir,
    ...sharpOptions,
  });

  const pictureElement = EleventyImg.generateHTML(metadata, {
    sizes: "(min-width: 768px) 768px, 100vw",
    loading: "lazy",
    decode: "async",
    ...htmlOptions,
  });

  return `<div class="image-container"><a href="${
    linkedImage.webp[0].url
  }" class="image" target="_blank" style="max-width:${
    metadata.webp[0].width
  }px">${pictureElement}</a>${
    photoCredit ? "<span>Image Credit: " + photoCredit + "</span>" : ""
  }</div>`;
}

async function bannerImage(post) {
  const src = await getBannerImageSrc(post, post.data);
  if (!src) {
    return "";
  }

  const outputDir = path.join(post.data.eleventy.directories.output, "img");
  const metadata = await Image(src, {
    widths: [1, 1.5, 2].map((scale) => 768 * scale),
    formats: ["avif", "webp"],
    outputDir,
    ...getSharpOptions(post.data.banner_image),
  });

  const pictureElement = EleventyImg.generateHTML(metadata, {
    alt: post.data.banner_image.alt,
    sizes: "(min-width: 768px) 768px, 100vw",
    loading: "lazy",
    decode: "async",
  });
  return `<a href="${post.url}" class="image image-container">${pictureElement}</a>`;
}

// Copied from https://github.com/markdown-it/markdown-it-footnote/blob/fe6c169c72b9f4d6656b10aa449128456f5a990e/index.mjs#L17C1-L23C2
function renderFootnoteCaption(tokens, idx) {
  const n = Number(tokens[idx].meta.id + 1).toString();
  if (tokens[idx].meta.subId > 0) n += `:${tokens[idx].meta.subId}`;
  return `${n}`;
}

function eagerFirstImagesPlugin(tree) {
  let numSet = 0;
  tree.match({ tag: "img" }, (node) => {
    if (numSet < 2) {
      node.attrs.loading = "eager";
      numSet++;
    }
    return node;
  });
}
