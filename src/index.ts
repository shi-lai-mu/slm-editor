/**
 * 对外暴露方法的类
 */

import 'reflect-metadata';
import AppModule from "./app.module";
import { EditorNS } from './typings';

import '@/assets/style/index.less';

/**
 * 简单的编辑器
 */
export default class Editor {
  /**
   * 内部app模块
   */
  public $!: AppModule;

  /**
   * 构造函数 [创建编辑器]
   * @param editorOptions 编辑器配置
   */
  constructor(editorOptions: EditorNS.CreateOptions) {
    this.$ = new AppModule(editorOptions);
    // 总渲染方法可以保留给实例，列如create后再执行，此处先直接执行
    this.$.render();
  }

  /**
   * 禁用编辑器
   * @publicApi
   */
  disable() {
    // disable editor code...
  }

  /**
   * 解除禁用编辑器
   * @publicApi
   */
   enable() {
    // disable editor code...
  }
}

const newEditor = new Editor('#editor');
window.editor = newEditor;

console.log(newEditor);