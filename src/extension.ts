import * as vscode from "vscode";
import * as fs from "fs";
import * as mustache from "mustache";
import { makePathParameters } from "./utils";

export const activate = (context: vscode.ExtensionContext) => {
  const disposable = vscode.commands.registerCommand("vscode-tempfile.newfile", () => {
    const config = vscode.workspace.getConfiguration("tempfile");
    const pathTemplate = config.get<string>("newFilePath");

    if (!pathTemplate) {
      throw new Error("newFilePath is not set");
    }

    const filePath = mustache.render(pathTemplate, makePathParameters(new Date()));

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "");
    }

    vscode.window.showInformationMessage(`Created: ${filePath}`);

    const openPath = vscode.Uri.file(filePath);
    vscode.workspace.openTextDocument(openPath).then((doc) => {
      vscode.window.showTextDocument(doc, { preview: false });
    });
  });

  vscode.workspace.openTextDocument();

  context.subscriptions.push(disposable);
};

export function deactivate() {
  // NOP
}
