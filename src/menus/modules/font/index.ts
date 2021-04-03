import { Module } from '@/core/decorators/module.decorators';
import { MenusFontBoldModule } from './bold';
import { MenusFontColorModule } from './color';
import { MenusFontHeadModule } from './head';

/**
 * 菜单拓展 文字 主模块
 */
@Module({
  imports: [
    MenusFontBoldModule,
    MenusFontHeadModule,
    MenusFontColorModule,
  ]
})
export class MenusFontModule {};