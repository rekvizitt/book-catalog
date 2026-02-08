export function buildDevServer(options) {
  return {
    port: options.port ?? 3000,
    open: true
  };
}
