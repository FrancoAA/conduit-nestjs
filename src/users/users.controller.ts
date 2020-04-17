import { Controller, Post, Body, ValidationPipe, UsePipes, Get, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {

  @Post()
  @UsePipes(ValidationPipe)
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return `loginUser: ${JSON.stringify(loginUserDto)}`
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return `createUser: ${JSON.stringify(createUserDto)}`;
  }

  @Get()
  async getCurrentUser() {
    return `getCurrentUser`;
  }

  @Put()
  @UsePipes(ValidationPipe)
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return `updateUser: ${JSON.stringify(updateUserDto)}`;
  }
}
