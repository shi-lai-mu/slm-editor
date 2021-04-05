import { MenusColors, MenusHead, RenderModule } from "@/constants/menus.constants";
import Editor from "..";

declare global {
  interface Window {
    editor: Editor;
  }
}

/**
 * Editor namespace
 */
export namespace EditorNS {
  /**
   * 元素选择器
   */
  export type SelectorElement = string
    | HTMLElement
    | HTMLElement[]
    | HTMLCollection
    | Element
    | Document
    | HTMLBodyElement
  ;

  /**
   * 菜单配置
   */
  export interface MenusConfig {
    /**
     * 菜单节点选择器
     */
    selector: SelectorElement;
    /**
     * 配置工具栏
     * @description 配置菜单栏、删减菜单、调整顺序
     * @enum (RenderModule) or (set false disable)
     * @see <https://github.com/shi-lai-mu/slm-editor/docs/toolbar.md>
     */
    toolbar?: RenderModule[] | false;
    /**
     * 配置颜色
     * @description 编辑器的字体颜色和背景色
     * @enum (RenderModule) or (set false disable)
     * @see <https://github.com/shi-lai-mu/slm-editor/docs/colors.md>
     */
    colors?: MenusColors[] | string[] | false;
    /**
     * 配置加粗 粗细
     * @description 编辑器加粗内容的粗细
     * @see <https://github.com/shi-lai-mu/slm-editor/docs/bold.md>
     */
    bold?: number | false;
    /**
     * 配置标题
     * @description 配置菜单栏标题、删减标题、调整顺序
     * @see <https://github.com/shi-lai-mu/slm-editor/docs/bold.md>
     */
    head?: MenusHead | false;
  }

  /**
   * 创建配置
   */
   export type Options = {
    /**
     * 创建编辑器的元素选择参数
     */
     selector: SelectorElement;
    /**
     * 编辑器 菜单栏 配置
     */
    menus?: MenusConfig;
  };

  /**
   * 创建配置
   */
  export type CreateOptions = Options | SelectorElement;

}
