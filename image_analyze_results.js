import { readFile } from "node:fs/promises";
import * as path from "path";

const results = JSON.parse(await readFile("output.json"));
const formats = {};

for (const result of results) {
  if (result.result == null) {
    continue;
  }
  const resultPath = path.parse(result.comparison);
  if (!formats[resultPath.ext]) {
    formats[resultPath.ext] = {};
  }
  const attr = resultPath.name
    .split("-")
    .filter((p) => p.startsWith("quality"))[1];
  if (!attr) {
    continue;
  }
  if (!formats[resultPath.ext][attr]) {
    formats[resultPath.ext][attr] = [];
  }
  formats[resultPath.ext][attr].push(result.result);
}

for (const format of formats) {
  for (const attr of formats[format]) {
  }
}
