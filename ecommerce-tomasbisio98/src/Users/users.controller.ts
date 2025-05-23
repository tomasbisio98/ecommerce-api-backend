import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/roles.enum';
import { Roles } from 'src/decorators/role.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async getUsers(@Query('page') page?: number, @Query('limit') limit?: number) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 5;
    return this.usersService.getUsers(pageNum, limitNum);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.getUserById(id);
  }

  // @Post()
  // async addUser(@Body() userDto: CreateUserDto) {
  //   return this.usersService.addUser(userDto);
  // }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() userDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, userDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.deleteUser(id);
  }
}
