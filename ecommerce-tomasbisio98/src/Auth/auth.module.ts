import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controllers';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
