// Using globals from vitest.config.ts

// Mock vscode module since we're not in VSCode environment
vi.mock("vscode", () => ({
  workspace: {
    workspaceFolders: [
      {
        uri: {
          fsPath: "/test/workspace"
        }
      }
    ]
  }
}));

// Mock os module to control tmpdir for testing
vi.mock("node:os", () => ({
  tmpdir: () => "/tmp"
}));

describe("path utilities", () => {
  it("should create path parameters correctly", async () => {
    const { makePathParameters } = await import("../src/path");
    const params = makePathParameters();

    expect(params.tempdir).toBe("/tmp");
    expect(params.tmpdir).toBe("/tmp"); // alias
    expect(params.wsdir).toBe("/test/workspace");
  });

  it("should handle empty workspace folders", async () => {
    // Mock empty workspace
    vi.doMock("vscode", () => ({
      workspace: {
        workspaceFolders: []
      }
    }));

    // Re-import to get fresh module with new mock
    vi.resetModules();
    const { makePathParameters } = await import("../src/path");
    const params = makePathParameters();

    expect(params.wsdir).toBe("");
  });
});