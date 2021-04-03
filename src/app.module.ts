// import { Injectable } from '@core/decorators';
import { BodyModel } from './body';
import { Inject, Module } from '@core/decorators/module.decorators';
import { MenusModel } from './menus';
import { MenusRegConfig } from './menus/decorators';
import { EditorNS } from './typings';
// import { ReflectProperty } from './constants/decorators.constants';

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
  /**
   * 默认配置
   */
  @MenusRegConfig()
  config: EditorNS.CreateOptions = {
    selector: '#editor1',
  };

  
  @Inject()
  private readonly menus?: MenusModel;


  /**
   * 构造函数 [初始化编辑器]
   * @param config 初始配置
   */
  constructor(
    config: EditorNS.CreateOptions,
  ) {
    this.config = config;
    console.log('init app module...', this);
    console.log({menus: this.menus});
    
  }
};
