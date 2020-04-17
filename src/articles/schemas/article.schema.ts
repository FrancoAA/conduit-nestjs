import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
  slug: String,
  title: String,
  description: String,
  body: String,
  tagList: [String],
  createdAt: Date,
  updatedAt: Date,
  favoritedBy: [String],
  author: String,
});
