import { ReflectProperty } from "@/constants/decorators.constants";
import { DomBase } from "../dom";
import { findTarget } from "./module.decorators";

const menusList: { [k: string]: Function } = {};

/**
 * 装饰器 注册菜单 但 不引入及实例
 * @param name 菜单模块名
 */
export function RegisterMenu(name: string): ClassDecorator {
  if (menusList[name]) {
    // TODO: 报错但不终止注册
    console.error(`[注册错误] 子菜单注册重名! 这可能会导致未知的渲染错误! register is #{${name}}`);
  }
  return (target: Function) => {
    menusList[name] = target;
    Reflect.defineMetadata(ReflectProperty.RENDER_INJECT, name, target);
    console.info(`    ↓   register menu #${name}`);
  };
};


/**
 * 装饰器 标记方法为渲染方法
 */
 export function InjectImportRender(): MethodDecorator {
  return (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    const originMethod = descriptor.value.bind(target);
    descriptor.value = function() {
      const { injectOptions, $parentEl } = this as any;
      const nodes = DomBase.createElement('<div></div>')[0];

      // 根据注入配置的参数解析渲染
      injectOptions?.map(moduleName => {
        const curModule = menusList[moduleName];
        if (curModule) {
          const moduleClass: any = findTarget(curModule);
          if (moduleClass.render) {
            const renderNode = moduleClass.render();
            Array.isArray(renderNode)
              ? nodes.append(...renderNode as any)
              : console.error(`[渲染错误] ${moduleName} 在渲染时输出非法节点!`, renderNode)
            ;
            console.log({renderNode});
          }
        }
      });
      const value = originMethod([ ...nodes.children as any ]);
      console.log({value});
      
      if ($parentEl) {
        (<HTMLElement>$parentEl).append(
          ( Array.isArray(value) ? value :  value ) as any
        );
      }
    }
  }
}


/**
 * 选择/创建 元素
 * @param el 选择器入参
 */
export const SelectOrCreateElement = (el: HTMLElement | Element | string) => {
  console.log(el);
};
