import esbuild from "esbuild";

esbuild
  .build({
    outfile: "build/server/index.js",
    entryPoints: ["server/index.ts"],
    external: ["./build/server/*"],
    platform: "node",
    format: "esm",
    packages: "external",
    bundle: true,
    logLevel: "info",
  })
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
