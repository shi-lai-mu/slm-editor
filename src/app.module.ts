// import { Injectable } from '@core/decorators';
import { BodyModel } from './body';
import { Inject, Injectable, Module } from '@core/decorators/module.decorators';
import { MenusModel } from './menus';
import { InjectRepository, ConfigInit } from './menus/decorators';
import { EditorNS } from './typings';
import { InjectImportRender } from './core/decorators';
import { RenderModule } from './constants/menus.constants';
// import { ReflectProperty } from './constants/decorators.constants';

/**
 * 编辑器类 (总模块 注入点)
 */
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

  /**
   * 注射配置 [渲染模块]
   * - 编辑器主体模块部分渲染及顺序
   */
  private injectOptions: string[] = [
    RenderModule.MENU,
    RenderModule.BODY,
  ];

  /**
   * 编辑器菜单区域
   */  
  @Inject() public readonly menus!: MenusModel;

  /**
   * 编辑器内容区域
   */
  @Inject() public readonly body!: BodyModel;


  /**
   * 构造函数 [初始化编辑器]
   * @param config 初始配置
   */
  constructor(
    @InjectRepository(ConfigInit) config: EditorNS.CreateOptions,
  ) {
    this.config = config;
    this.menus.init(config);
    this.body.init(config);
  }


  /**
   * 总渲染方法
   */
  @InjectImportRender()
  render() {
    // 一些额外的渲染逻辑code...
  }
};
