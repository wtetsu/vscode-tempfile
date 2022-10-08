import * as vscode from "vscode";
import { tmpdir } from "os";

export const makePathParameters = () => {
  const tempdir = tmpdir();
  const wsdir = getWorkspacePath();

  return {
    tempdir,
    tmpdir: tempdir,
    wsdir: wsdir,
  };
};

const getWorkspacePath = (): string => {
  for (const f of vscode.workspace.workspaceFolders ?? []) {
    return f.uri.fsPath;
  }

  return "";
};
