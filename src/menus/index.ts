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
  

  constructor() {
  }

  @GlobalApi()
  public test(ca) {
  }
}