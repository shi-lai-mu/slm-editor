import Editor from "..";

declare global {
  interface Window {
    editor: Editor;
  }
}

