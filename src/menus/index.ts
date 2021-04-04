import DomElement, { $ } from '@core/dom';
import { EditorNS } from '@/typings';
import { MenusFontModule } from './modules/font';
import { InjectImportRender, RegisterRender } from '@core/decorators';
import { MenusToolBar } from '@/constants/menus.constants';
import { MenusBackgroundModule } from './modules/background';
import { Injectable, Module } from '@core/decorators/module.decorators';

/**
 * 菜单类 主模块
 */
@Module({
  imports: [
    MenusFontModule,
    MenusBackgroundModule,
  ],
})
@RegisterRender('Menu')
@Injectable
export class MenusModel {

  /**
   * 菜单节点
   */
  public $el?: Element[];

  /**
   * 菜单父级节点
   */
  public $parentEl?: Element;

  /**
   * 注射配置 [渲染模块]
   * - 此处包含渲染排列顺序
   */
  public injectOptions: MenusToolBar[] = [
    // 引入本期 三个功能需求
    MenusToolBar.FONT_HEAD,
    MenusToolBar.FONT_BOLD,
    MenusToolBar.FONT_COLOR,
  ];


  /**
   * 初始化菜单
   * @param opt 配置项
   */
  public init(opt: EditorNS.CreateOptions) {
    if ((<EditorNS.Options>opt).menus) {
      this.injectOptions = (<EditorNS.Options>opt)?.menus?.toolbar || [];
    }

    if (typeof opt === 'string') {
      this.$parentEl = new DomElement(opt).element[0];
    }
  }


  /**
   * 渲染方法
   */
  @InjectImportRender()
  public render(injectDOM?: Element[]) {
    const $el = $(`<div class="s-toolbar"></div>`)[0];
    // TODO: 此处injectDOM为注射器抛出，当前模块注入依赖模块渲染后的元素值，下方主要定义依赖值的渲染位置非固定写法
    $el.append(...(injectDOM || [])); // 直接插入当前节点子级中
    return $el;
  }

  // @GlobalApi()
  // public disable(ca) {
  //   // GlobalApi code ...
  // }
}