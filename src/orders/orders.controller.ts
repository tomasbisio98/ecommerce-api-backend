import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  addOrder(@Body() createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto;
    const productIds = products.map((p) => p.id);
    return this.ordersService.addOrder(userId, productIds);
  }
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  getOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ordersService.getOrder(id);
  }
}
