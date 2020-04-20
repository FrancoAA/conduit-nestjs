import { Document } from 'mongoose';

export interface ArticleComment extends Document {
  readonly _id: String;
  readonly body: String;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly author: String;
}
