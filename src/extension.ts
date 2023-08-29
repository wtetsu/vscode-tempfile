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

  const register = (name: string) => {
    const disposable = vscode.commands.registerCommand(name, () => {
      try {
        newfile();
      } catch (e) {
        if (e instanceof Error) {
          vscode.window.showErrorMessage(e.message);
        }
      }
    });
  
    vscode.workspace.openTextDocument();
  
    context.subscriptions.push(disposable);
  };

  ["default", "alt"].forEach(x => register(`tempfile.newfile.${x}`));
};

const newfile = async () => {
  const config = vscode.workspace.getConfiguration("tempfile");

  let pathTemplate = config.get<string>("newFilePath") ?? "";
  if (!pathTemplate.trim()) {
    pathTemplate = "{{tempdir}}/tempfile/{{YYYY}}{{MM}}{{DD}}_{{HH}}{{mm}}{{ss}}{{SSS}}.md";
  }

  if (config.get<boolean>("ending") ?? false) {
    let ending = pathTemplate;
    for (let i = pathTemplate.length - 1; i >= 0; i--) {
      if (['.', '/'].includes(pathTemplate[i])) {
        ending = pathTemplate.substring(i + 1);
        pathTemplate = pathTemplate.substring(0, i);
        break;
      }
    }
    if (pathTemplate === ending) pathTemplate = '';
    const userInput = await vscode.window.showInputBox({
      prompt: 'What file ending?',
    });
    if (userInput) {
      const strippedUserInput = userInput.trim().replace(/^\./, '');
      if (strippedUserInput !== '') ending = strippedUserInput;
    }
    pathTemplate += '.' + (ending !== '' ? ending : 'file');
  }

  const pathParameters = makePathParameters();
  const parameters = {
    ...pathParameters,
    ...makeDateParameters(new Date()),
  };
  const newFilePath = mustache.render(pathTemplate.trim(), parameters);

  if (!pathParameters.wsdir) {
    if (newFilePath !== mustache.render(pathTemplate.trim(), { ...parameters, wsdir: "dummy" })) {
      throw new Error("Workspace folder not found");
    }
  }

  const initialContentTemplate = config.get<string>("initialContent") ?? "";
  const initialContent = mustache.render(initialContentTemplate, parameters);

  const append = config.get<boolean>("append") ?? false;

  if (!fs.existsSync(newFilePath)) {
    makeTempFile(newFilePath, initialContent);
  } else {
    if (append) {
      fs.appendFileSync(newFilePath, initialContent);
    }
  }

  openByTab(newFilePath, append);
};

const makeTempFile = async (newFilePath: string, content: string) => {
  const dirPath = path.dirname(newFilePath);

  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(newFilePath, content);
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
