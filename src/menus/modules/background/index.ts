import { Module } from '@core/decorators/module.decorators';
import { MenusBackgroundColorModule } from './color';

/**
 * 菜单拓展 背景 主模块
 */
@Module({
  imports: [
    MenusBackgroundColorModule,
  ]
})
export class MenusBackgroundModule {};