import { EditorNS } from '@/typings';

/**
 * DOM Base Class
 * @description Dom Element Class 拓展基类
 */
export class DomBase {

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
  element: HTMLElement[] = [];

  /**
   * 构造函数[选择/创建元素]
   * @param selector 元素选择器
   */
  constructor(selector: T) {
    super();

    if (!selector) {
      throw new Error(`${DomElement.name} > 选择器不能为 ${String(selector)}!`);
    }
    
  }
}