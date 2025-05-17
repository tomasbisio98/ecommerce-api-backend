import { Categories } from 'src/categories/entities/category.entity';
import { OrderDetails } from 'src/orders/entities/orderDetails.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'PRODUCTS' })
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  stock: number;

  @Column({
    type: 'text',
    nullable: false,
    default:
      'https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/media/image/2022/01/ces-2022-2582123.jpg?tf=1200x',
  })
  imgUrl: string; //vamos a almacenar URL's con la ubicación remota de la URL
  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories; // aquí debemos guardar un objeto completo (estructura completa de la categoría)

  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];
}
