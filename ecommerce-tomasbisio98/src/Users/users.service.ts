/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
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
    const { isAdmin, password, ...userWithoutSensitiveData } = user;
    return userWithoutSensitiveData;
  }

  // async addUser(userData: Partial<Users>) {
  //   try {
  //     const existingUser = await this.userRepository.findOne({
  //       where: { email: userData.email },
  //     });

  //     if (existingUser) {
  //       throw new BadRequestException('Unable to process the request');
  //     }

  //     const user = this.userRepository.create(userData);
  //     const userSaved = await this.userRepository.save(user);
  //     return userSaved;
  //   } catch (error) {
  //     if (error instanceof BadRequestException) {
  //       throw error;
  //     }

  //     throw new InternalServerErrorException('Unable to process the request');
  //   }
  // }

  async updateUser(id: string, updateData: Partial<Users>) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = Object.assign(user, updateData);
    const savedUser = await this.userRepository.save(updatedUser);

    const { isAdmin, password, ...userWithoutSensitiveData } = savedUser;
    return userWithoutSensitiveData;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(user);
    const { isAdmin, password, ...userWithoutSensitiveData } = user;
    return userWithoutSensitiveData;
  }
}
