<p align="center">
  <img width="500" src="https://user-images.githubusercontent.com/515948/194064360-6842f71d-7c8d-444e-a819-0b509d3169f8.png" alt="tempfile logo" />
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=wtetsu.tempfile"><img src="https://img.shields.io/visual-studio-marketplace/v/wtetsu.tempfile?style=flat-square&label=VS%20Code%20Marketplace&logo=visual-studio-code" alt="VS Code Marketplace"/></a>
  <a href="https://github.com/wtetsu/vscode-tempfile/actions/workflows/test.yml"><img src="https://img.shields.io/github/actions/workflow/status/wtetsu/vscode-tempfile/test.yml?style=flat-square&label=Tests&logo=github" alt="Test Status" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=wtetsu.tempfile"><img src="https://img.shields.io/visual-studio-marketplace/d/wtetsu.tempfile?style=flat-square&label=Downloads&logo=visual-studio-code" alt="Downloads"/></a>
</p>

# ⚡ Tempfile for VS Code

**Instantly create temporary files with smart naming and content templates.**

Perfect for quick notes, code snippets, debugging logs, or any temporary content. No more cluttering your workspace with `untitled-1.txt` files!

## 🚀 Quick Start

**Default shortcut:** `Ctrl+Alt+T` (Windows/Linux) | `⌘+Alt+T` (Mac)


<img src="https://user-images.githubusercontent.com/515948/194067735-9d81973d-71f5-48cc-b6c6-c3e7f3e9d04b.gif" alt="tempfile demo">

## ⌨️ Commands

| Command | Shortcut | Description |
|---------|----------|-------------|
| **New tempfile** | `Ctrl+Alt+T` / `⌘+Alt+T` | Create temp file with default extension |
| **New tempfile with extension** | `Ctrl+Alt+Shift+T` / `⌘+Alt+Shift+T` | Choose file extension first |

> 💡 **Tip:** You can also access commands via Command Palette (`Ctrl+Shift+P`) → "Tempfile"

## ⚙️ Configuration

You can customize the file path and initial content.

| Config                  | Description                        | Default                                                                 |
| ----------------------- | ---------------------------------- | ----------------------------------------------------------------------- |
| tempfile.newFilePath    | New file path                      | {{tempdir}}/tempfile/{{YYYY}}{{MM}}{{DD}}\_{{HH}}{{mm}}{{ss}}{{SSS}}.md |
| tempfile.initialContent | New file content                   | # {{YYYY}}-{{MM}}-{{DD}} {{HH}}:{{mm}}:{{ss}}.{{SSS}}\n                 |
| tempfile.append         | If `true`, append to existing file | false                                                                   |


## 🔧 Template Parameters

| Parameter   | Value                                            |
| ----------- | ------------------------------------------------ |
| {{tempdir}} | The system's temporary directory (`os.tmpdir()`) |
| {{wsdir}}   | Workspace root                                   |
| {{YYYY}}    | Year                                             |
| {{MM}}      | Month                                            |
| {{DD}}      | Day                                              |
| {{HH}}      | Hour                                             |
| {{mm}}      | Minute                                           |
| {{ss}}      | Second                                           |
| {{SSS}}     | Millisecond                                      |


## Third-party attribution

- [Draw, edit, new icon](https://www.iconfinder.com/icons/3994420/draw_edit_new_pen_write_icon)
