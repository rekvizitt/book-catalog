import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
// import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import webpack from "webpack";

export function buildPlugins(options) {
  return [
    new HtmlWebpackPlugin({ template: options.htmlTemplate }),
    new CopyWebpackPlugin({ patterns: [{ from: "public", to: "" }] })
    // new webpack.ProgressPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: "[name].[contenthash].css",
    //   chunkFilename: "[id].[contenthash].css"
    // })
  ];
}
