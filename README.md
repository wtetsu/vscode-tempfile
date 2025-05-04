<p align="center">
  <img width="500" src="https://user-images.githubusercontent.com/515948/194064360-6842f71d-7c8d-444e-a819-0b509d3169f8.png" alt="tempfile logo" />
  <br/>
</p>

<p align="center">
  <a href="https://github.com/wtetsu/vscode-tempfile/actions/workflows/test.yml"><img src="https://github.com/wtetsu/vscode-tempfile/actions/workflows/test.yml/badge.svg" alt="Test" /></a>
</p>

<!-- <p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=wtetsu.tempfile"><img src="https://vsmarketplacebadge.apphb.com/version/wtetsu.tempfile.svg"/></a>
</p> -->

[Tempfile - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=wtetsu.tempfile)

# vscode-tempfile

This extension instantly creates a temporary file and opens it in a new tab.

Default shortcut key: `Ctrl+Alt+T` or `⌘+Alt+T`

<img src="https://user-images.githubusercontent.com/515948/194067735-9d81973d-71f5-48cc-b6c6-c3e7f3e9d04b.gif" alt="tempfile demo">

## Commands

| Command                     | Default shortcut key                  |
| --------------------------- | ------------------------------------- |
| New tempfile                | `Ctrl+Alt+T` or `⌘+Alt+T`             |
| New tempfile with extension | `Ctrl+Alt+Shift+T` or `⌘+Alt+Shift+T` |

## Configuration

You can customize the file path and initial content.

| Config                  | Description                        | Default                                                                 |
| ----------------------- | ---------------------------------- | ----------------------------------------------------------------------- |
| tempfile.newFilePath    | New file path                      | {{tempdir}}/tempfile/{{YYYY}}{{MM}}{{DD}}\_{{HH}}{{mm}}{{ss}}{{SSS}}.md |
| tempfile.initialContent | New file content                   | # {{YYYY}}-{{MM}}-{{DD}} {{HH}}:{{mm}}:{{ss}}.{{SSS}}\n                 |
| tempfile.append         | If `true`, append to existing file | false                                                                   |

## Parameters

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
