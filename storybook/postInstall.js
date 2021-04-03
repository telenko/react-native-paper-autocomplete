const fse = require("fs-extra");
const path = require("path");
const fs = require("fs");
var dir = "./tmp";

const srcDir = path.resolve(__dirname, "..", "src");
const indexSrc = path.resolve(__dirname, "..", "index.ts");
const destDir = path.resolve(
  __dirname,
  "node_modules",
  "@telenko",
  "react-native-paper-autocomplete"
);
const destSrcDir = path.resolve(destDir, "src");

const run = async () => {
  await fse.ensureDir(path.resolve(destSrcDir));
  // await fse.emptyDirSync
  await fse.copy(srcDir, destSrcDir);
  await fse.copy(indexSrc, path.resolve(destDir, 'index.ts'));
};

try {
    run();
} catch (e) {
    console.error(`[LINKING failed to ${destDir}], reason: ${e}`);
}
