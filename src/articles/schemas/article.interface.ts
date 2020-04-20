import { Document } from 'mongoose';

export interface Article extends Document {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly tagList: [string];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly favoritedBy: [string];
  readonly author: string;
  readonly comments: [string];
}
