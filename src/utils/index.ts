/**
 * 返回不可枚举配置写入的属性
 * @param value 值
 * @returns PropertyDescriptor
 */
export function propertySealDescriptor(value): PropertyDescriptor {
  return {
    writable: false,
    enumerable: false,
    configurable: false,
    value,
  };
}