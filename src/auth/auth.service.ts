/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/users/dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: CreateUserDto) {
    const existingUser = await this.usersRepository.findOneBy({
      email: user.email,
    });

    if (existingUser) {
      throw new BadRequestException('Unable to process the request');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.usersRepository.save({
      ...user,
      password: hashedPassword,
    });

    const { isAdmin, password, ...cleanUser } = newUser;
    return cleanUser;
  }

  async signIn(credentials: LoginDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: credentials.email },
      select: ['id', 'email', 'password', 'isAdmin'],
    });

    if (!existingUser) {
      throw new BadRequestException('Invalid credentials');
    }

    const matchedPassword = await bcrypt.compare(
      credentials.password,
      existingUser.password,
    );

    if (!matchedPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = {
      id: existingUser.id,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
    };

    const token = this.jwtService.sign(payload);

    return token;
  }
}
