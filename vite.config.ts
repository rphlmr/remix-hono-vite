import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import devServer, { defaultOptions } from "@hono/vite-dev-server";

export default defineConfig({
  server: {
    port: 3000,
    https: {
      key: "./server/dev/key.pem",
      cert: "./server/dev/cert.pem",
    },
  },
  plugins: [
    remix({
      serverBuildFile: "remix.js",
    }),
    tsconfigPaths(),
    devServer({
      injectClientScript: false,
      entry: "./server/index.ts", // The file path of your server.
      exclude: [/^\/(app)\/.+/, ...defaultOptions.exclude],
    }),
  ],
});
