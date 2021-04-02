export interface ModuleMetadata {
  /**
   * 导入模块可选列表 ，这些程序必须为导出的模块
   */
  imports?: Array<
    Type<any> | ForwardReference
  >;
}

  
export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}


export interface ForwardReference<T = any> {
  forwardRef: T;
}