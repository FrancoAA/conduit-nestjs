import { Document } from 'mongoose';

export interface Article extends Document {
  readonly slug: String;
  readonly title: String;
  readonly description: String;
  readonly body: String;
  readonly tagList: [String];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly favoritedBy: [String];
  readonly author: String;
}
