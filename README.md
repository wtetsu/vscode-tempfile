<p align="center">
  <img width="500" src="https://user-images.githubusercontent.com/515948/194064360-6842f71d-7c8d-444e-a819-0b509d3169f8.png" alt="tempfile logo" />
  <br/>
</p>

# vscode-tempfile

This extension immediately creates a temporary file and opens it in a new tab.


<img src="https://user-images.githubusercontent.com/515948/194067735-9d81973d-71f5-48cc-b6c6-c3e7f3e9d04b.gif" alt="tempfile demo">


## Configuration

You can specify the new file path and initial content.

| Config                  | Description      | Default                                                       |
| ----------------------- | ---------------- | ------------------------------------------------------------- |
| tempfile.newFilePath    | New file path    | {{tmpdir}}/{{YYYY}}{{MM}}{{DD}}\_{{HH}}{{mm}}{{ss}}{{SSS}}.md |
| tempfile.initialContent | New file content | # {{YYYY}}-{{MM}}-{{DD}} {{HH}}:{{mm}}:{{ss}}.{{SSS}}\n       |

## Parameters

| Parameter  | Value       |
| ---------- | ----------- |
| {{tmpdir}} | os.tmpdir() |
| {{YYYY}}   | Year        |
| {{MM}}     | Month       |
| {{DD}}     | Day         |
| {{HH}}     | Hour        |
| {{mm}}     | Minute      |
| {{ss}}     | Second      |
| {{SSS}}    | Millisecond |


## Third party data

* [Draw, edit, new icon](https://www.iconfinder.com/icons/3994420/draw_edit_new_pen_write_icon)
