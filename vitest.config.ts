/// <reference types="vitest" />

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: './', // <-- bu MUHIM
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
