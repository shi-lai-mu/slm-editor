import { ReflectProperty } from '@/constants/decorators.constants';
import { propertySealDescriptor } from '@/utils';
import { GlobalOptions, ModuleMetadata } from '../../typings/decorators.d'

// 实例列表
const extractClass: Function[] = [];


/**
 * 装饰器 将类标记为模块
 * 
 * 编辑器 使用模块功能将类组织载入到程序中
 * 
 * @param metadata 模块配置数据
 * 
 * @publicApi
 */
export function Module(metadata: ModuleMetadata): ClassDecorator {
  return (target: Function) => {
    if (metadata.imports) {
      const property = 'imports';
      if (metadata.hasOwnProperty(property)) {
        console.warn('>', target.name, property, metadata[property]);
        Reflect.defineProperty(target, ReflectProperty.IMPORTS, propertySealDescriptor(metadata[property]));
        // TODO: 这里暂时先不进行单例返回，先注入一个 实例一个怎么简单怎么来
        Reflect.defineProperty(
          target,
          ReflectProperty.IMPORTS_EXTRACT,
          propertySealDescriptor(metadata[property]?.map((v: any) => findTarget(v))),
        );
      }
    }
    
    if (metadata.exports) {
      metadata.exports.forEach(expModuel => {
        const curMetadata = (expModuel as Function).prototype[ReflectProperty.GLOBALAPI];
        if (curMetadata) {
          const curTarget = findTarget(curMetadata.target.constructor)
          if (curTarget) {
            target.prototype[curMetadata.key] = curTarget[curMetadata.key].bind(curTarget)
          }
        }
      });
      // console.log({
      //   ex: (<any>metadata.exports[0]).prototype[ReflectProperty.GLOBALAPI],
      // });
    }
  };
};


/**
 * 查找实例
 * @param target 原型
 */
function findTarget(target: Function): Function | null {
  let symbolId = target.constructor[ReflectProperty.ID];
  
  if (!symbolId) {
    Object.keys(extractClass).some(key => {
      const extract = extractClass[key];
      const query = extract instanceof target;
      if (query) {
        symbolId = key
      }
      return query;
    });
  }

  if (!symbolId) {
    symbolId = extractClass.push(new (target as { new (): typeof target })());
    Reflect.defineMetadata(target, ReflectProperty.ID, propertySealDescriptor(symbolId));
  }

  return extractClass[symbolId] || null;
}


/**
 * 标记方法为公共方法
 */
export function GlobalApi(globalOptions?: GlobalOptions): MethodDecorator {
  return (
    target: any,
    key?: string | symbol,
  ) => {
    Reflect.defineProperty(
      target,
      ReflectProperty.GLOBALAPI,
      propertySealDescriptor({
        opt: globalOptions || {},
        target,
        key,
      },
    ));
  };
}
