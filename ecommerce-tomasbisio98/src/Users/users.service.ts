/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number) {
    const allUsers = await this.userRepository.find();

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginated = allUsers.slice(start, end);

    return paginated.map(({ password, ...user }) => user);
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['order'], // Aquí me traigo las órdenes de compra del usuario
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async addUser(userData: Users) {
    try {
      const user = this.userRepository.create(userData);
      const saved = await this.userRepository.save(user);

      const { password, ...userWithoutPassword } = saved;
      return userWithoutPassword;
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async updateUser(id: string, updateData: Users) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = Object.assign(user, updateData);
    const saved = await this.userRepository.save(updatedUser);

    const { password, ...userWithoutPassword } = saved;
    return userWithoutPassword;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(user);

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
