import { BodyModel } from "@/body";
import { MODULE_METADATA } from "@/constants/decorators.constants";
import { MenusToolBar } from "@/constants/menus.constants";
import { $, DomBase } from "@core/dom";
import { InjectRepository } from "@/menus/decorators";
import { fontColor } from "@/menus/icon";
import { RegisterRender } from "@core/decorators";
import { Injectable } from "@/core/decorators/module.decorators";

/**
 * 菜单拓展 文字 颜色 模块
 */
@RegisterRender(MenusToolBar.FONT_COLOR)
@Injectable
export class MenusFontColorModule {

  /**
   * 菜单名
   */
  public name = '字体颜色';

  /**
   * 颜色色块
   */
  public colos: string[] = [
    '#000',
    '#CCC',
    '#1c487f',
    '#4d80bf',
    '#c24f4a',
    '#8baa4a',
    '#7b5ba1',
    '#46acc8',
    '#f9963b',
  ];

  constructor(
    @InjectRepository(BodyModel, 'body', MODULE_METADATA.INJECT_MODULE) private readonly body?: BodyModel,
  ) {}

  render() {
    // 此处先直接用字符串拼接
    const listEl = $(`<div class="s-menu-droplist colors-panel"></div>`)[0];
    listEl.append(
      ...this.colos.map(val => {
        return $(`
            <div class="colors-panel-color" style="color: ${val}"></div>
          `,
          {
            click: (e) => {
              e.stopPropagation();
              this.body?.cmd('foreColor', false, 'red');
            },
          },
        )[0];
      }),
    );

    return DomBase.createElement(`
      <div class="s-menu" title="${this.name}">
        <img src="${fontColor}" class="icon">
      </div>
      `,
      false,
      [ listEl ],
    );
  }
}
