import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CatchEverythingFilter } from 'lib/exceptionFilter';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { SequelizeConfigModule } from './modules/sequelize/sequelize-config.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    UserModule,
    CategoryModule,
    ProductModule,
    AuthModule,
    SequelizeConfigModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
  ],
})
export class AppModule {}
