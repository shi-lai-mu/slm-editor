import { InjectImportRender, RegisterRender } from "@core/decorators";
import { GlobalApi, Injectable, Module } from "@core/decorators/module.decorators";
import DomElement, { $ } from "@core/dom";
import { EditorNS } from "@/typings";

/**
 * 编辑内容区类 主模块
 */
@RegisterRender('Body')
@Injectable
export class BodyModel {
  /**
   * 菜单节点
   */
  public $el?: Element[];

  /**
   * 菜单父级节点
   */
  public $parentEl?: Element;


  /**
   * 执行命令
   * @param commandId 指定要执行的命令的字符串
   * @param showUI 显示界面
   * @param value 分配值
   */
  @GlobalApi()
  public cmd(commandId: string, showUI?: boolean | undefined, value?: string | undefined) {
    // 这里先不做过多的处理
    document.execCommand(commandId, showUI, value);
  }
 
 
  /**
   * 初始化内容
   * @param opt 配置项
   */
  public init(opt: EditorNS.CreateOptions) {
    if (typeof opt === 'string') {
      this.$parentEl = new DomElement(opt).element[0];
    }
  }

  /**
   * 渲染方法
   */
  @InjectImportRender()
  public render(injectDOM?: Element[]) {
    const $el = $(`<div class="s-text-container" contenteditable="true"></div>`)[0];
    // TODO: 此处injectDOM为注射器抛出，当前模块注入依赖模块渲染后的元素值，下方主要定义依赖值的渲染位置非固定写法
    $el.append(...(injectDOM || [])); // 直接插入当前节点子级中
    return $el;
  }
}