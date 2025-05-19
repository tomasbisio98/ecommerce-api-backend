import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './entities/order.entity';
import { Users } from 'src/users/entities/user.entity';
import { Products } from 'src/products/entities/product.entity';
import { OrderDetails } from './entities/orderDetails.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>, // 👈 correcto
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
  ) {}

  async addOrder(userId: string, productIds: string[]) {
    const user: Users | null = await this.usersRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder: Orders = await this.ordersRepository.save(order);

    let total = 0;

    const productsArray: Products[] = await Promise.all(
      productIds.map(async (productId) => {
        const product: Products | null =
          await this.productsRepository.findOneBy({ id: productId });

        if (!product) {
          throw new NotFoundException('Product not found');
        }

        total += Number(product.price);

        if (product.stock <= 0) {
          throw new BadRequestException(`Product ${product.name} has no stock`);
        }

        await this.productsRepository.update(
          { id: productId },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    const orderDetail = new OrderDetails();
    orderDetail.order = newOrder;
    orderDetail.price = Number(total.toFixed(2));
    orderDetail.products = productsArray;

    await this.orderDetailsRepository.save(orderDetail);

    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });
  }

  async getOrder(id: string) {
    return await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });
  }
}
