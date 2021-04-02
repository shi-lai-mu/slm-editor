import { Module } from '@/core/decorators/module.decorators';
import { MenusFontBoldModule } from './bold';

/**
 * 菜单拓展 文字 主模块
 */
@Module({
  imports: [
    MenusFontBoldModule,
  ]
})
export class MenusFontModule {};