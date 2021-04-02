export const MenusRegConfig = (type?: any) => {
  
  return function (target, name) {
    console.log('xxxxxxxxxxx');
    
    console.log(type, target, name);
    console.log(target[name]);
    
  } as PropertyDecorator;
}