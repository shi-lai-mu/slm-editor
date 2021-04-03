export interface ModuleMetadata {
  /**
   * 导入模块可选列表 ，这些程序必须为导出的模块
   */
  imports?: Array<
    Type<any> | ForwardReference
  >;
  /**
   * 导出模块公共方法到本模块中 (向下一级)
   */
   exports?: Array<
    Type<any> | ForwardReference
  >;
}

export interface GlobalOptions {
  /**
   * true：  注入到根下
   * false： 带有当前class name方法
   */
  root?: boolean;
}
  
export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}


export interface ForwardReference<T = any> {
  forwardRef: T;
}

export type Events = {
  [K in keyof GlobalEventHandlersEventMap]?: (this: GlobalEventHandlers, ev: GlobalEventHandlersEventMap[K]) => any;
}