import { ModuleMetadata } from '../../typings/decorators.d'


/**
 * 装饰器 将类标记为模块
 * 
 * 编辑器 使用模块功能将类组织载入到程序中
 * 
 * @param metadata 模块配置数据
 * 
 * @publicApi
 */
 export function Module (metadata: ModuleMetadata): ClassDecorator {
  return (target: Function) => {
    for (const property in metadata) {
      if (metadata.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, (metadata as any)[property], target);
      }
    }
  }
};