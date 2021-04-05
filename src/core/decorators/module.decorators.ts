import { MODULE_METADATA, ReflectProperty } from '@/constants/decorators.constants';
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
          propertySealDescriptor(metadata[property]?.map((v: any) => {
            const find = findTarget(v);
            // 处理 code...
            return find;
          })),
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
export function findTarget(target: Function): Function | null {
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
    symbolId = extractClass.push(new (target as { new (): typeof target })()) - 1;
    Reflect.defineMetadata(target, ReflectProperty.ID, propertySealDescriptor(symbolId));
  }

  return extractClass[symbolId] || null;
}


/**
 * 注入依赖
 * @param targetExtract 依赖项
 */
export function Inject(targetExtract?: Function): PropertyDecorator {
  return function (target: Object, key: string | symbol) {
    const token = targetExtract || Reflect.getMetadata('design:type', target, key);
    Reflect.defineProperty(target, key, {
      value: findTarget(token),
    });
  };
}


/**
 * 装饰器 标记类为可注射类
 */
export function Injectable(module: any): any {
  return class extends module {
    constructor(...args) {
      super(...args);
      const metaKeys = Reflect.getMetadataKeys(module);
      Reflect.defineMetadata(
        ReflectProperty.INJECT_INFO,
        {
          args,
          origin: module,
        },
        this,
      );

      // 注射检测
      metaKeys.forEach(key => {
        const metaData = Reflect.getMetadata(key, module);
        const { Inject, type, name, index } = metaData;
        switch(type) {
          // 注射器注入方法
          case MODULE_METADATA.INJECT:
            metaData.Inject(args[index]);
            break;

          // 注射器预注射模块
          case MODULE_METADATA.INJECT_MODULE:
            this[name] = findTarget(Inject)
            break;
        }
      });
    }
  };
}


/**
 * 装饰器 标记方法为公共方法
 * @param globalOptions 标记配置
 * 
 * @description 用于标记该方法为(根/上级)的方法，当方法被标记那么在(根/上级)模块方法中会出现这个方法并且this指向为当前模块
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
