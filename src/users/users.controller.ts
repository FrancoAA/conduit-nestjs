import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Get,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './users.service';
import { GetUser } from './get-user.decorator';
import { User } from './schemas/user.interface';
import { AuthGuard } from '@nestjs/passport';

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
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  async getCurrentUser(@GetUser() user: User): Promise<User> {
    return user;
  }

  @Put()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ) {
    // return `updateUser: ${JSON.stringify(updateUserDto)}`;
    return this.userService.updateUser(user._id, updateUserDto);
  }
}
