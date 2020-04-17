import { Controller, Get } from '@nestjs/common';

@Controller('tags')
export class TagsController {

  @Get()
  async getTags() {
    return `getTags`;
  }
}
