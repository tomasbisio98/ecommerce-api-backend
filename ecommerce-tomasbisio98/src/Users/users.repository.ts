import { Injectable } from '@nestjs/common';
import { IUser } from './users.entity';

@Injectable()
export class UsersRepository {
  private users: IUser[] = [
    {
      id: 1,
      email: 'user1@example.com',
      name: 'John Doe',
      password: 'password123',
      address: '123 Main Street',
      phone: '123-456-7890',
      country: 'USA',
      city: 'New York',
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: 'securePass456',
      address: '456 Maple Avenue',
      phone: '987-654-3210',
      country: 'Canada',
      city: 'Toronto',
    },
    {
      id: 3,
      email: 'mario.rossi@example.com',
      name: 'Mario Rossi',
      password: 'm4ri0Pass!',
      address: 'Via Roma 12',
      phone: '011-2345678',
      country: 'Italy',
      city: 'Rome',
    },
    {
      id: 4,
      email: 'sofia.fernandez@example.com',
      name: 'Sofía Fernández',
      password: 'sofiaPwd321',
      address: 'Av. Siempre Viva 742',
      phone: '351-444-5555',
      country: 'Argentina',
      city: 'Córdoba',
    },
    {
      id: 5,
      email: 'li.wei@example.com',
      name: 'Li Wei',
      password: 'weiSecure789',
      address: '88 Bamboo Road',
      phone: '010-12345678',
      country: 'China',
      city: 'Beijing',
    },
  ];
  find() {
    return this.users;
  }
}
