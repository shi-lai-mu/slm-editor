import { EditorNS } from '@/typings';
import { Events } from '@/typings/decorators';

/**
 * DOM Base Class
 * @description Dom Element Class 拓展基类
 */
export class DomBase {
  /**
   * 创建元素
   * @param html html字符串
   * @param events 绑定事件
   */
  static createElement(html: string, events?: Events): Element[] {
    const tmpEl = document.createElement('div');
    tmpEl.innerHTML = html;
    if (events) {
      Object.keys(events).forEach(type => {
        tmpEl.childNodes.forEach(node => node.addEventListener(type, events[type]));
      });
    }
    return Object.values(tmpEl.children);
  }


  /**
   * 选择元素
   * @param selector      元素选择器
   * @param parentElement 父级节点开始选择
   * @param events 绑定事件
   */
  static querySelectorAll(selector: string, parentElement?: Element | Document, events?: Events): Element[] {
    if (!parentElement) parentElement = document;
    const queryEl = parentElement.querySelectorAll(selector);
    if (events) {
      Object.keys(events).forEach(type => {
        queryEl.forEach(node => node.addEventListener(type, events[type]));
      });
    }
    return Object.values(queryEl);
  }
}


/**
 * DOM Element Class
 * @description 选择/创建 元素
 */
export default class DomElement<T extends EditorNS.SelectorElement> extends DomBase {

  /**
   * 选择器
   */
  selector!: T;

  /**
   * 当前选中的元素
   */
  element: Element[] = [];

  /**
   * 构造函数 [选择/创建元素]
   * @param selector 元素选择器
   * @param events 绑定事件
   */
  constructor(selector: T, events?: Events) {
    super();

    if (!selector) {
      throw new Error(`${DomElement.name} > 选择器不能为 ${String(selector)}!`);
    }

    if (typeof selector === 'string') {
      const tmpSelector = selector.replace(/\n|\t/mg, '').trim();
      this.element = tmpSelector[0] === '<'
        ? DomElement.createElement(selector, events)
        : DomElement.querySelectorAll(selector, undefined, events)
      ;

    } else {
      // 先暂时这么判定
      this.element = selector as Element[];
    }
  }

  /**
   * 绑定事件
   * @param type     事件类型
   * @param listener 事件函数
   */
  public on<K extends keyof GlobalEventHandlersEventMap>(type: K, listener: (this: Element, ev: Event) => any): DomElement<T> {
    this.element.forEach(node => node.addEventListener(type, listener));
    return this;
  }
}


/**
 * 构造函数 [选择/创建元素]
 * @param selector 元素选择器
 * @param events 绑定事件
 */
export const $ = (selector: EditorNS.SelectorElement, events?: Events): Element[] => new DomElement(selector, events).element;
