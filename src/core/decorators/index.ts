import { ReflectProperty } from "@/constants/decorators.constants";
import { DomBase } from "../dom";
import { findTarget } from "./module.decorators";

const rendModelList: { [k: string]: Function } = {};

/**
 * 装饰器 注入渲染模块 但 不引入及实例
 * @param name 菜单模块名
 */
export function RegisterRender(name: string): ClassDecorator {
  if (rendModelList[name]) {
    // TODO: 报错但不终止注册
    console.error(`[注册错误] 渲染模块注入重名! 这可能会导致未知的渲染错误! register is #{${name}}`);
  }
  return (target: Function) => {
    rendModelList[name] = target;
    Reflect.defineMetadata(ReflectProperty.RENDER_INJECT, name, target);
    console.info(`    ↓   register render #${name}`);
  };
};


/**
 * 装饰器 标记方法为渲染方法
 */
 export function InjectImportRender(): MethodDecorator {
  return (target: any, _propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    const originMethod = descriptor.value.bind(target);
    descriptor.value = function() {
      const { injectOptions, $parentEl } = this as any;
      const nodes = DomBase.createElement('<div></div>')[0];

      // 根据注入配置的参数解析渲染
      injectOptions?.map(moduleName => {
        const curModule = rendModelList[moduleName];
        if (curModule) {
          const moduleClass: any = findTarget(curModule);
          if (moduleClass && moduleClass.render) {
            const renderNode = moduleClass.render();
            if (Array.isArray(renderNode)) {
              nodes.append(...renderNode);
            }
          }
        }
      });
      const value = originMethod(nodes.children);
      if ($parentEl) {
        (<HTMLElement>$parentEl).append(
          ( Array.isArray(value) ? value :  value )
        );
      }
    }
  }
}
