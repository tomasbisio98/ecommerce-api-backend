import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  signin(email: string, password: string) {
    return this.usersRepository.signin(email, password);
  }
}
