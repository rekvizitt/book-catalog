import { buildPlugins } from "./buildPlugins.js";
import { buildLoaders } from "./buildLoaders.js";
import { buildDevServer } from "./buildDevServer.js";

export function buildWebpack(options) {
  const isDev = options.mode === "development";
  console.log(options.mode ?? "development");
  return {
    mode: options.mode ?? "development",
    entry: options.entry,
    output: {
      path: options.output,
      filename: "[name].[contenthash:8].js",
      clean: true
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options)
    },
    devtool: isDev ? "inline-source-map" : false,
    devServer: isDev ? buildDevServer(options) : undefined
  };
}
