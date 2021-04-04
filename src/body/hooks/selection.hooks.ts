import { Hooks } from "@/core/hooks";

/**
 * 选区事件钩子
 */
export default class SelectionHooksEvent extends Hooks {

  /**
   * Range
   */
  public lastRange?: Range;


  /**
   * 构造函数 [绑定事件]
   * @param root 事件体
   */
  constructor(private readonly root: Element) {
    super(document, 'selectionchange');
    console.log(root, this.root);
  }


  /**
   * 设置/恢复/清空 Range
   */
  public set(range?: Range) {
    const selection = window.getSelection();
    if (range) this.lastRange = this.lastRange;
    if (!this.lastRange || !selection) return;

    console.log(selection);
    
    selection.removeAllRanges();
    selection.addRange(this.lastRange);
  }


  /**
   * 事件处理
   */
  public handleEvent(_listener: Event) {
    const selection = window.getSelection();
    if (!selection) return;

    const { anchorNode, focusNode } = selection;
    if (!anchorNode || !focusNode) return;

    if (!this.root.contains(anchorNode)) return;

    this.lastRange = selection.getRangeAt(0);
  }
}