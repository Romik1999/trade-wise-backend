import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ComponentModule } from './component/component.module';
import { ProductModule } from './product/product.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    ComponentModule,
    ProductModule,
    FileModule,
  ],
})
export class AppModule {}
