import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';

import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import { AllExceptionsFilter } from './utilities';
import { UserModule } from './modules/user/user.module';
import { ShopModule } from './modules/shop/shop.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    AuthModule,
    SharedModule,
    UserModule,
    ShopModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }
  ],
})
export class AppModule { }
