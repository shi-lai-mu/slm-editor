import { BodyModel } from "@/body";
import { MODULE_METADATA } from "@/constants/decorators.constants";
import { RenderModule } from "@/constants/menus.constants";
import { Injectable } from "@core/decorators/module.decorators";
import { $, DomBase } from "@core/dom";
import { InjectRepository } from "@/menus/decorators";
import { fontBold } from "@/menus/icon";
import { RegisterRender } from "@core/decorators";

/**
 * 菜单拓展 文字 加粗 模块
 */
@RegisterRender(RenderModule.FONT_BOLD)
@Injectable
export class MenusFontBoldModule {

  /**
   * 菜单名
   */
  public name = '加粗';

  constructor(
    @InjectRepository(BodyModel, 'body', MODULE_METADATA.INJECT_MODULE) private readonly body?: BodyModel,
  ) {}

  render() {
    // 此处先直接用字符串拼接
    return DomBase.createElement(`
        <div class="s-menu" title="${this.name}">
          <img src="${fontBold}" class="icon">
        </div>
      `,
      {
        click: (e) => {
          e.stopPropagation();
          this.body?.cmd('bold');
        },
      },
    );
  }
}
