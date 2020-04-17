import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Get,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/login')
  @UsePipes(ValidationPipe)
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    // return `loginUser: ${JSON.stringify(loginUserDto)}`;
    return this.userService.loginUser(loginUserDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log(`createUser: ${JSON.stringify(createUserDto)}`);
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getCurrentUser() {
    // return `getCurrentUser`;
    return this.userService.getUser('5e99d5eb62b9d31a56fd1752');
  }

  @Put()
  @UsePipes(ValidationPipe)
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    // return `updateUser: ${JSON.stringify(updateUserDto)}`;
    return this.userService.updateUser(
      '5e99d5eb62b9d31a56fd1752',
      updateUserDto,
    );
  }
}
