import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './schemas/tag.interface';

@Injectable()
export class TagsService {
  constructor(@InjectModel('Tag') private readonly tagModel: Model<Tag>) {}

  async addTag(name: string) {
    return this.tagModel.findOneAndUpdate(
      { name },
      { $inc: { count: 1 } },
      { upsert: true, new: true },
    );
  }
}
