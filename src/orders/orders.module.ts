import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from './entities/order.entity';
import { Users } from 'src/users/entities/user.entity';
import { Products } from 'src/products/entities/product.entity';
import { OrderDetails } from './entities/orderDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Users, Products, OrderDetails])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
