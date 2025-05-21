import { Orders } from 'src/orders/entities/order.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'USERS' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    type: 'bigint',
  })
  phone: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  country: string;

  @Column({
    type: 'text',
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  city: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin: boolean;

  @OneToMany(() => Orders, (order) => order.user)
  order: Orders[];
}
