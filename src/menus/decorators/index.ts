import { ReflectProperty } from "@/constants/decorators.constants";
import { EditorNS } from "@/typings";


/**
 * 装饰器 标记变量为菜单配置项
 * @param config 菜单配置
 * @publicApi
 */
export const MenusRegConfig = (config?: EditorNS.MenusConfig): PropertyDecorator => {
  return function (target: Object, _name: string | symbol) {
    Reflect.defineMetadata(ReflectProperty.MENU_CONFIG, config, target);
  };
}