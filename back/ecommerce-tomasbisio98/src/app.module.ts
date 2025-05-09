import { Module } from '@nestjs/common';
import { AuthModule } from './Auth/auth.module';
import { UsersModule } from './Users/users.module';
import { ProductsModule } from './Products/products.module';

@Module({
  imports: [AuthModule, UsersModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
