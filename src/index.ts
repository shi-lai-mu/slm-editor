/**
 * 对外暴露方法的类
 */

import 'reflect-metadata';
import AppModule from "./app.module";
import { BodyModel } from './body';
import { MenusModel } from './menus';
import { Module } from '@core/decorators/module.decorators';

/**
 * 简单的编辑器
 */
@Module({
  exports: [
    MenusModel,
    BodyModel,
  ],
})
export default class Editor {
  /**
   * 内部app模块
   */
  public $: AppModule;

  /**
   * 构造函数 创建编辑器
   * @param opt 编辑器配置
   */
  constructor(opt: any) {
    this.$ = new AppModule(opt);
  }
}

const newEditor = new Editor({});
window.editor = newEditor;
