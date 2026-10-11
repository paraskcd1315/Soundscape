import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const fromRoot = (path: string): string =>
  fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@soundscape/engine": fromRoot("./projects/engine/src"),
      "@soundscape/audio": fromRoot("./projects/audio/src"),
      "@soundscape/visualizer": fromRoot("./projects/visualizer/src"),
      "@soundscape/design-system": fromRoot("./projects/design-system/src"),
      "@app": fromRoot("./src/app"),
    },
  },
  build: { target: "es2022", sourcemap: false },
  test: {
    include: ["projects/*/tests/**/*.test.ts", "src/**/*.test.ts"],
    environment: "node",
  },
});
