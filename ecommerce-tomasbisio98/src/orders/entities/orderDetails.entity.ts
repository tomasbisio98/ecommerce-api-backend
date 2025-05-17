import { Products } from 'src/products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Orders } from './order.entity';

@Entity({
  name: 'ORDER_DETAILS',
})
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @ManyToMany(() => Products)
  @JoinTable({
    name: 'ORDER_DETAILS_PRODUCTS',
  })
  products: Products[];

  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Orders; //tengo estructura completa con los datos de la Orden
}
