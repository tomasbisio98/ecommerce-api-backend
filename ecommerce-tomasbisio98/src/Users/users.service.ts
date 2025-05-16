import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // la lógica de paginado se hace aquí y no en repository porque luego ese archivo va a desaparecer.
  getUsers(page: number, limit: number) {
    let users = this.usersRepository.getUsers();
    const start = (page - 1) * limit;
    const end = start + limit;

    users = users.slice(start, end);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...user }) => user);
  }

  getUserById(id: number) {
    return this.usersRepository.getUserById(id);
  }

  addUser(user: any) {
    return this.usersRepository.addUser(user);
  }

  updateUser(id: number, user: any) {
    return this.usersRepository.updateUser(id, user);
  }

  deleteUser(id: number) {
    return this.usersRepository.deleteUser(id);
  }
}
