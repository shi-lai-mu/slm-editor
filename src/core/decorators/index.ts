/**
 * 公共方法Map
 */
const globalFunctionMap: any = [];
/**
 * 公共类实例
 */
const globalClass: any = [];

export const MenuModule = (options?: any) => {
  return (x?: any) => {
    console.log({x, options});
  };
};


/**
 * 标记方法为公共方法
 */
export function GlobalFunction(): MethodDecorator {
  return (
    target: any,
    key?: string | symbol,
    descriptor?: TypedPropertyDescriptor<any>,
  ) => {
    console.log({target: target.constructor.name});
    
    globalFunctionMap.push({
      name: target.constructor.name,
      target,
      fn: descriptor?.value.bind(target),
    });
  };
}

export const InjectGlobalFunction = (constructor: any) => {
  globalFunctionMap.forEach(gbFnItem => {
    globalClass.some((cc: any) => {
      const target = gbFnItem.target.constructor;
      if (target && (cc instanceof target)) {
        constructor.prototype[gbFnItem.name] = cc[gbFnItem.name].bind(cc);
        return true;
      }
      return false;
    })
  });
}


/**
 * 选择/创建 元素
 * @param el 选择器入参
 */
export const SelectOrCreateElement = (el: HTMLElement | Element | string) => {
  console.log(el);

};


/**
 * 将类标记为提供者
 */
export const Injectable = <T>(constructor: T & Function): T => {
  class InjectableModule extends (constructor as any) {
    constructor(...args) {
      super(...args);
      // const { $ModuleOptions } = constructor.prototype;
      delete this.$ModuleOptions;
    }
  };
  return InjectableModule as any
};