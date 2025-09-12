import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // VSCode extension runs in a Node.js environment
    target: "node16",

    // Build as a library
    lib: {
      entry: "src/extension.ts",
      formats: ["cjs"], // CommonJS format (required for VSCode extensions)
      fileName: "extension",
    },

    // Rollup options
    rollupOptions: {
      // Modules to exclude as external dependencies
      external: [
        "vscode",
        "node:fs",
        "node:path",
        "node:os",
        // Node.js built-ins
        /^node:/,
      ],

      output: {
        // Output settings for CommonJS format
        format: "cjs",
        exports: "named",
      },
    },

    // Output directory
    outDir: "dist",

    // Generate source maps (for debugging)
    sourcemap: true,

    // Remove existing dist before build
    emptyOutDir: true,

    // Minification settings
    minify: process.env.NODE_ENV === "production",
  },

  // TypeScript settings
  esbuild: {
    // Target environment for the VSCode extension
    target: "node16",
  },
});
