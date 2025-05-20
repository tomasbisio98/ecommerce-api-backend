import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/users/dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async signin({ email, password }: LoginDto): Promise<string> {
    if (!email || !password) {
      throw new BadRequestException('Faltan credenciales');
    }

    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Email o password incorrectos');
    }

    return 'Login exitoso';
  }
}
