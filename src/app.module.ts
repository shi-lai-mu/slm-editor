// import { Injectable } from '@core/decorators';
import { BodyModel } from './body';
import { Inject, Injectable, Module } from '@core/decorators/module.decorators';
import { MenusModel } from './menus';
import { InjectRepository, ConfigInit } from './menus/decorators';
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
@Injectable
export default class AppModule {
  /**
   * 默认配置
   */
  
  public config: EditorNS.CreateOptions = {
    selector: '#editor1',
  };

  
  @Inject()
  public readonly menus!: MenusModel;


  /**
   * 构造函数 [初始化编辑器]
   * @param config 初始配置
   */
  constructor(
    @InjectRepository(ConfigInit) config: EditorNS.CreateOptions,
  ) {
    this.config = config;
    this.menus.init(config);
    console.log('init app module...', this);
    this.menus.render()
    console.log();
    
  }

  render() {

  }
};
