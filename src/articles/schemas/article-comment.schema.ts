import * as mongoose from 'mongoose';

export const ArticleCommentSchema = new mongoose.Schema({
  createdAt: Date,
  updatedAt: Date,
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

// pre-save hook
ArticleCommentSchema.pre('save', function(next) {
  // sets updatedAt & createdAt fields
  let now = Date.now();

  this.updatedAt = now;

  if (!this.createdAt) {
    this.createdAt = now;
  }

  next();
});
