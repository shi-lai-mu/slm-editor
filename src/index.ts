/**
 * 对外暴露方法的类
 */

import 'reflect-metadata';
import AppModule from "./app.module";
import { InjectGlobalFunction } from "@core/decorators";

/**
 * 简单的编辑器
 */
@InjectGlobalFunction
export default class Editor {

  /**
   * 内部app模块
   */
  private $: AppModule;


  constructor(opt: any) {
    this.$ = new AppModule(opt);
  }
  

  /**
   * 禁用 [案例] 
   */
  public enable() {
    this.$
  }
}

const newEditor = new Editor({});
// newEditor.test();
window.editor = newEditor;
