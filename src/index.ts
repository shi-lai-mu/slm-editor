/**
 * 对外暴露方法的类
 */

import 'reflect-metadata';
import AppModule from "./app.module";
import { BodyModel } from './body';
import { MenusModel } from './menus';
import { Module } from '@core/decorators/module.decorators';
import { EditorNS } from './typings';

import '@/assets/style/index.less';

/**
 * 简单的编辑器
 */
@Module({
  exports: [
    AppModule,
    MenusModel,
    BodyModel,
  ],
})
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