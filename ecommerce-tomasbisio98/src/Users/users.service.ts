import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
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

    if (!allUsers.length) {
      throw new NotFoundException('No hay usuarios registrados');
    }

    const start = (page - 1) * limit;
    const end = start + limit;

    return allUsers.slice(start, end);
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['order'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async addUser(userData: Partial<Users>) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: userData.email },
      });

      if (existingUser) {
        throw new BadRequestException('Ya existe un usuario con ese correo.');
      }

      const user = this.userRepository.create(userData);
      const saved = await this.userRepository.save(user);
      return saved;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Error creating user');
    }
  }

  async updateUser(id: string, updateData: Partial<Users>) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = Object.assign(user, updateData);
    return this.userRepository.save(updatedUser);
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(user);
    return user;
  }
}
