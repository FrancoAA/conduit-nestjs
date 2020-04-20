import * as slug from 'slug';
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
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ArticleComment' }],
});

// pre-save hook for the article schema
ArticleSchema.pre('save', function(next) {
  // sets updatedAt & createdAt fields
  let now = Date.now();

  this.updatedAt = now;

  if (!this.createdAt) {
    this.createdAt = now;
  }

  // sets the slug if no slug is provided
  this.slug = this.slug || slug(this.title, { lower: true });

  next();
});
