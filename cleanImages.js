import { glob } from "glob";
import * as path from "path";
import { rm } from "fs/promises";

for (const imagePath of await glob(`${process.argv[2]}/**/*.jpg`)) {
  const name = path.basename(imagePath, ".jpg");
  for (const deletionPath of await glob(`_site/img/${name}*`)) {
    console.log(deletionPath);
    await rm(deletionPath);
  }
}
