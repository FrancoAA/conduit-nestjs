import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TagSchema } from './schemas/tag.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tag', schema: TagSchema }])],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
