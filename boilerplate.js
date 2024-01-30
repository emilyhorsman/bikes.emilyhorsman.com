import { glob } from "glob";
import * as path from "path";
import { rm } from "fs/promises";

for (const imagePath of await glob(`${process.argv[2]}/**/*.jpg`)) {
  const name = path.basename(imagePath);
  console.log(`{% image "${name}" "TODO" %}`);
}
