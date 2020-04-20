import { Document } from 'mongoose';

export interface ArticleComment extends Document {
  readonly _id: string;
  readonly body: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly author: string;
}
