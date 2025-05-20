import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  addOrder(@Body() createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto;
    const productIds = products.map((p) => p.id);
    return this.ordersService.addOrder(userId, productIds);
  }

  @Get(':id')
  getOrder(@Param('id') id: string) {
    return this.ordersService.getOrder(id);
  }
}
