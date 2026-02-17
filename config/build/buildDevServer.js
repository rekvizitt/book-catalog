import path from "path";

export function buildDevServer(options) {
  const staticDir = path.resolve(options.output, "..", "public");
  return {
    static: {
      directory: staticDir,
      serveIndex: false
    },
    port: options.port ?? 3000,
    open: true
  };
}
