// import { Injectable } from '@core/decorators';
import { BodyModel } from './body';
import { Module } from '@core/decorators/module.decorators';
import { MenusModel } from './menus';
import { MenusRegConfig } from './menus/decorators';

/**
 * 编辑器类 (总模块 注入点)
 */
// @Injectable
@Module({
  imports: [
    MenusModel,
    BodyModel,
  ],
})
export default class AppModule {
  @MenusRegConfig('test')
  config: any = {
    hhh: 'test'
  }

  public xxx = 132456

  /**
   * 构造函数 [初始化编辑器]
   * @param config 配置
   */
  constructor(config: any) {
    this.config = config;
  }
};
