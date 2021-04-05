import { BodyModel } from "@/body";
import { MODULE_METADATA } from "@/constants/decorators.constants";
import { RenderModule } from "@/constants/menus.constants";
import { Injectable } from "@core/decorators/module.decorators";
import { $, DomBase } from "@core/dom";
import { InjectRepository } from "@/menus/decorators";
import { fontHead } from "@/menus/icon";
import { RegisterRender } from "@core/decorators";

/**
 * 菜单拓展 文字 标题 模块
 */
 @Injectable
 @RegisterRender(RenderModule.FONT_HEAD)
export class MenusFontHeadModule {

  /**
   * 菜单名
   */
  public name = '标题';

  constructor(
    @InjectRepository(BodyModel, 'body', MODULE_METADATA.INJECT_MODULE) private readonly body?: BodyModel,
  ) {}


  /**
   * 标题 配置
   */
  public head: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
  ];
  

  /**
   * 渲染主方法
   */
  render() {
    // 此处先直接用字符串拼接
    const listEl = $(`<div class="s-menu-droplist"></div>`)[0];
    listEl.append(
      ...this.head.map(val => {
        return $(`
            <div class="s-list-item">
              <h${val}>H${val}</h${val}>
            </div>
          `,
          {
            click: (e) => {
              e.stopPropagation();
              this.body?.cmd('formatBlock', false, `<h${val}>`);
            },
          },
        )[0];
      }),
    );

    return DomBase.createElement(`
      <div class="s-menu" title="${this.name}">
        <img src="${fontHead}" class="icon">
      </div>
      `,
      false,
      [ listEl ],
    );
  }
}
