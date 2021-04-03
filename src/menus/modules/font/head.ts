import { MenusToolBar } from "@/constants/menus.constants";
import { RegisterMenu } from "@core/decorators";

/**
 * 菜单拓展 文字 标题 模块
 */
@RegisterMenu(MenusToolBar.FONT_HEAD)
export class MenusFontHeadModule {
  constructor() {}
}
