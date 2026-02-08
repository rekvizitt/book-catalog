import HtmlWebpackPlugin from "html-webpack-plugin";
// import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import webpack from "webpack";

export function buildPlugins(options) {
  return [
    new HtmlWebpackPlugin({ template: options.htmlTemplate })
    // new webpack.ProgressPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: "[name].[contenthash].css",
    //   chunkFilename: "[id].[contenthash].css"
    // })
  ];
}
