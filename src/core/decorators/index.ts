
export const MenuModule = (options?: any) => {
  return (x?: any) => {
    console.log({x, options});
  };
};


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