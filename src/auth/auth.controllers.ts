import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dtos/login.dto';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() credentials: LoginDto) {
    return this.authService.signIn(credentials);
  }

  @Post('/signup')
  sigunUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }
}
