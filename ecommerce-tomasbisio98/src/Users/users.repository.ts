import { Injectable } from '@nestjs/common';
import { User } from './users.entity';

@Injectable()
export class UsersRepository {
  private users: User[] = [
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
    {
      id: 6,
      email: 'test6@example.com',
      name: 'Li sex',
      password: 'weiSecure789',
      address: '33 didot par',
      phone: '0210-1234563428',
      country: 'Brazil',
      city: 'Rio',
    },
  ];
  private currentId = Math.max(...this.users.map((u) => u.id), 0) + 1; // ✅ arranca en el siguiente ID libre
  getUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  addUser(user: Omit<User, 'id'>) {
    const id = this.currentId++; // ✅ ID único, sin depender del length
    const newUser = { id, ...user };
    this.users = [...this.users, newUser];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  updateUser(id: number, user: User) {
    const oldUser = this.users.find((user) => user.id === id);

    if (!oldUser) {
      return null;
    }

    const updatedUser = { ...oldUser, ...user };

    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = updatedUser;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }

  deleteUser(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    const user = this.users[index];

    this.users.splice(index, 1);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  signin(email: string, password: string) {
    if (!email || !password) {
      return 'Faltan credenciales';
    }

    const user = this.users.find((user) => user.email === email);

    if (!user || user.password !== password) {
      return 'Email o password incorrectos';
    }
    return 'Login exitoso';
  }
}
