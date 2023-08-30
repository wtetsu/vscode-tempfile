import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as mustache from "mustache";
import { makeDateParameters } from "./date";
import { makePathParameters } from "./path";

export const activate = (context: vscode.ExtensionContext) => {
  // Disable HTML-escaping
  (mustache as any).escape = (text: any) => {
    return text;
  };

  context.subscriptions.push(register("tempfile.newfile", () => newfile("")));
  context.subscriptions.push(register("tempfile.newfile_with_extension", newfileWithExtension));
};

const register = (name: string, func: Function) => {
  return vscode.commands.registerCommand(name, () => {
    try {
      func();
    } catch (e) {
      if (e instanceof Error) {
        vscode.window.showErrorMessage(e.message);
      }
    }
  });
};

const newfileWithExtension = async () => {
  const pathTemplate = retrieveFilePathTemplate();
  const parameters = makeParameters();
  const defaultPath = mustache.render(pathTemplate.trim(), parameters);
  const extension = getExtension(defaultPath);

  const message = extension ? `New file extension (default: ${extension})` : "New file extension";

  const inputtedExtension = await vscode.window.showInputBox({
    prompt: message,
  });
  if (inputtedExtension === undefined) {
    return;
  }

  newfile(inputtedExtension);
};

const newfile = (extension: string) => {
  const pathTemplate = retrieveFilePathTemplate();

  const parameters = makeParameters();
  const newFilePath = mustache.render(pathTemplate.trim(), parameters);

  if (!parameters.wsdir) {
    if (newFilePath !== mustache.render(pathTemplate.trim(), { ...parameters, wsdir: "dummy" })) {
      throw new Error("Workspace folder not found");
    }
  }

  const config = vscode.workspace.getConfiguration("tempfile");

  const initialContentTemplate = config.get<string>("initialContent") ?? "";
  const initialContent = mustache.render(initialContentTemplate, parameters);

  const append = config.get<boolean>("append") ?? false;

  const actualNewFilePath = extension ? replaceExtension(newFilePath, extension) : newFilePath;

  if (!fs.existsSync(actualNewFilePath)) {
    makeTempFile(actualNewFilePath, initialContent);
  } else {
    if (append) {
      fs.appendFileSync(actualNewFilePath, initialContent);
    }
  }

  openByTab(actualNewFilePath, append);
};

const makeTempFile = async (newFilePath: string, content: string) => {
  const dirPath = path.dirname(newFilePath);

  try {
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(newFilePath, content);
  } catch (e) {
    if (e instanceof Error) {
      vscode.window.showErrorMessage(e.message);
    }
  }
};

const openByTab = async (path: string, goToBottom: boolean) => {
  const openPath = vscode.Uri.file(path);
  const doc = await vscode.workspace.openTextDocument(openPath);
  await vscode.window.showTextDocument(doc, { preview: false });
  await vscode.commands.executeCommand("cursorMove", { to: "viewPortBottom" });

  if (goToBottom) {
    await vscode.commands.executeCommand("cursorBottom");
  }
};

export const deactivate = () => {
  // NOP
};

const getExtension = (filePath: string): string => {
  const lastSlashIndex = Math.max(filePath.lastIndexOf("/"), filePath.lastIndexOf("\\"));
  const lastDotIndex = filePath.lastIndexOf(".");

  if (lastDotIndex > lastSlashIndex) {
    return filePath.substring(lastDotIndex + 1);
  }
  return "";
};

const replaceExtension = (filePath: string, newExtension: string): string => {
  const extension = getExtension(filePath);
  if (extension) {
    return filePath.substring(0, filePath.length - extension.length) + newExtension;
  }
  return filePath + "." + newExtension;
};

const retrieveFilePathTemplate = (): string => {
  const config = vscode.workspace.getConfiguration("tempfile");
  const pathTemplate = config.get<string>("newFilePath") ?? "";
  if (!pathTemplate.trim()) {
    return "{{tempdir}}/tempfile/{{YYYY}}{{MM}}{{DD}}_{{HH}}{{mm}}{{ss}}{{SSS}}.md";
  }
  return pathTemplate;
};

const makeParameters = (): { [key: string]: string } => {
  const pathParameters = makePathParameters();
  const parameters = {
    ...pathParameters,
    ...makeDateParameters(new Date()),
  };
  return parameters;
};
