import { MenusToolBar } from "@/constants/menus.constants";
import { RegisterMenu } from "@core/decorators";

/**
 * 菜单拓展 文字 颜色 模块
 */
@RegisterMenu(MenusToolBar.FONT_COLOR)
export class MenusFontColorModule {
  constructor() {}
}
