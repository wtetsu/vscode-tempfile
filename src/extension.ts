import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as mustache from "mustache";
import { makePathParameters } from "./utils";

export const activate = (context: vscode.ExtensionContext) => {
  // Disable HTML-escaping
  (mustache as any).escape = (text: any) => {
    return text;
  };

  const disposable = vscode.commands.registerCommand("tempfile.newfile", () => {
    const config = vscode.workspace.getConfiguration("tempfile");
    let pathTemplate = config.get<string>("newFilePath") ?? "";
    if (!pathTemplate.trim()) {
      pathTemplate = "{{tmpdir}}/{{YYYY}}{{MM}}{{DD}}_{{HH}}{{mm}}{{ss}}{{SSS}}.md";
    }

    const parameters = makePathParameters(new Date());
    const newFilePath = mustache.render(pathTemplate.trim(), parameters);

    const initialContentTemplate = config.get<string>("initialContent") ?? "";
    const initialContent = mustache.render(initialContentTemplate, parameters);

    makeTempFile(newFilePath, initialContent);
    openByTab(newFilePath);
  });

  vscode.workspace.openTextDocument();

  context.subscriptions.push(disposable);
};

const makeTempFile = async (newFilePath: string, content: string) => {
  if (fs.existsSync(newFilePath)) {
    return;
  }

  const dirPath = path.dirname(newFilePath);
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(newFilePath, content);
};

const openByTab = async (path: string) => {
  const openPath = vscode.Uri.file(path);
  const doc = await vscode.workspace.openTextDocument(openPath);
  await vscode.window.showTextDocument(doc, { preview: false });
  await vscode.commands.executeCommand("cursorMove", { to: "viewPortBottom" });
};

export const deactivate = () => {
  // NOP
};
