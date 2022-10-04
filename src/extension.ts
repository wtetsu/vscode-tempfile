import * as vscode from "vscode";
import * as os from "os";
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand("vscode-create-tempfile.newfile", () => {
    const dt = formatDate(new Date());
    const filePath = `${os.tmpdir()}/${dt}.txt`;

    fs.writeFileSync(filePath, "");
    vscode.window.showInformationMessage(`Created: ${filePath}`);

    const openPath = vscode.Uri.file(filePath);
    vscode.workspace.openTextDocument(openPath).then((doc) => {
      vscode.window.showTextDocument(doc, { preview: false });
    });
  });

  vscode.workspace.openTextDocument();

  context.subscriptions.push(disposable);
}

const formatDate = (dateTime: Date): string => {
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth().toString().padStart(2, "0");
  const date = dateTime.getDate().toString().padStart(2, "0");

  const hour = dateTime.getHours().toString().padStart(2, "0");
  const minute = dateTime.getMinutes().toString().padStart(2, "0");
  const second = dateTime.getSeconds().toString().padStart(2, "0");
  const millisecond = dateTime.getMilliseconds().toString().padStart(3, "0");

  return `${year}${month}${date}_${hour}${minute}${second}.${millisecond}`;
};

export function deactivate() {
  // NOP
}
