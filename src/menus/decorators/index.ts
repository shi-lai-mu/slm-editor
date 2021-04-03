import { MODULE_METADATA, ReflectProperty } from "@/constants/decorators.constants";
import { EditorNS } from "@/typings";

let configDb: EditorNS.CreateOptions = '';

/**
 * 装饰器 标记变量为注入资料库
 * @param Inject 注射器
 * @publicApi
 */
export const InjectRepository = (Inject: Function, name?: string): ParameterDecorator => {
  return function (target: Object, _name: string | symbol, index?: number) {
    Reflect.defineMetadata(
      ReflectProperty.INJECT_CONFIG,
      {
        type: MODULE_METADATA.INJECT,
        name,
        index,
        Inject,
      },
      target
    );
  };
}


/**
 * 注入配置
 * @param config 配置
 */
export function ConfigInit(config: EditorNS.CreateOptions) {
  configDb = config;
}


/**
 * 注入配置
 * @param config 配置
 */
export function setConfig(config: EditorNS.CreateOptions) {
  console.log({config, configDb});
}


/**
 * 装饰器 标记变量为读取资料库
 * @param Inject 注射器
 * @publicApi
 */
export function getConfig(Inject: Function): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    Reflect.defineMetadata(
      ReflectProperty.INJECT_GET_CONFIG,
      {
        type: MODULE_METADATA.INJECT_GET,
        name: propertyKey,
        Inject,
      },
      target
    );
  };
}