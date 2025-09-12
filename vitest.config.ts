import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Use happy-dom for lightweight DOM simulation (if needed)
    environment: "node",
    
    // Include test files
    include: ["tests/**/*.{test,spec}.{ts,js}"],
    
    // Exclude build output and node_modules
    exclude: ["out/**", "dist/**", "node_modules/**", "src/test/**"],
    
    // Coverage settings
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "out/**", 
        "dist/**", 
        "node_modules/**", 
        "tests/**",
        ".vscode-test/**",
        "coverage/**",
        "src/extension.ts" // VSCode extension entry point - integration testing needed
      ],
    },
    
    // Globals (optional - allows using describe/it without importing)
    globals: true,
  },
});