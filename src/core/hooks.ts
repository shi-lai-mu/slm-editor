/**
 * 钩子
 */
export class Hooks {

  constructor(
    private readonly el: Element | HTMLElement | Document,
    private readonly type: keyof GlobalEventHandlersEventMap,
  ) {
    el.addEventListener(type, this.handleEvent.bind(this));
  }


  /**
   * 解除事件绑定
   */
  public off() {
    this.el.removeEventListener(this.type, this.handleEvent.bind(this));
  }


  /**
   * 处理事件
   */
   public handleEvent(listener: Event) {};
}