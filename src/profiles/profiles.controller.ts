import { Controller, Get, Param, Post, Delete } from '@nestjs/common';

@Controller('profiles')
export class ProfilesController {

  @Get('/:username')
  async getProfile(@Param('username') username: string) {
    return `getProfile: ${username}`;
  }

  @Post('/:username/follow')
  async followUser(@Param('username') username: string) {
    return `followUser: ${username}`;
  }

  @Delete('/:username/follow')
  async unfollowUser(@Param('username') username: string) {
    return `unfollowUser: ${username}`;
  }
}
