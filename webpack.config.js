import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { buildWebpack } from "./config/build/buildWebpack.js";
import { Options } from "./config/build/buildOptions.js";

export default (env) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  // (port, entry, htmlTemplate, output, mode);
  const port = env.port ?? 3000;
  const entryPath = path.resolve(__dirname, "src", "index.js");
  const htmlTemplate = path.resolve(__dirname, "index.html");
  const outputPath = path.resolve(__dirname, "build");
  const modeBuild = env.mode ?? "development";

  const options = new Options(port, entryPath, htmlTemplate, outputPath, modeBuild);

  // console.log(options);
  return buildWebpack(options);
};
