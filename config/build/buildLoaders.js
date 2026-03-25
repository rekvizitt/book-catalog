export function buildLoaders(options) {
  const cssLoader = {
    test: /\.css$/i,
    use: ["style-loader", "css-loader"]
    // use: [MiniCssExtractPlugin.loader, "css-loader"]
  };
  const assetsLoader = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: "asset/resource",
    generator: { filename: "assets/[hash][ext][query]" }
  };

  return [cssLoader, assetsLoader];
}
