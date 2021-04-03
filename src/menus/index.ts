import DomElement, { $ } from '@/core/dom';
import { EditorNS } from '@/typings';
import { MenusFontModule } from './modules/font';
import { InjectImportRender } from '@/core/decorators';
import { MenusToolBar } from '@/constants/menus.constants';
import { MenusBackgroundModule } from './modules/background';
import { Injectable, Module } from '@/core/decorators/module.decorators';

/**
 * 菜单类 主模块
 */
@Module({
  imports: [
    MenusFontModule,
    MenusBackgroundModule,
  ],
})
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
   * 注射配置
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
    if (injectDOM) {
      $el.append(...injectDOM);
    }
    return $el;
  }

  // @GlobalApi()
  // public disable(ca) {
  //   // GlobalApi code ...
  // }
}