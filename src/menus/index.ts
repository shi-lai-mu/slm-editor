import { GlobalApi, Module } from '@/core/decorators/module.decorators';
import { MenusFontModule } from './modules/font';

/**
 * 菜单类 主模块
 */
@Module({
  imports: [
    MenusFontModule,
  ],
})
export class MenusModel {
  
  public xxx = 11111111111111

  constructor() {
    this.test('x');
  }

  @GlobalApi()
  public test(ca) {
    console.log('---->111111111111111');
    
    console.log(this.xxx);
  }
}