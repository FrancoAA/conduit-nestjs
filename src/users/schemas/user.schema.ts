import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  salt: String,
  bio: String,
  image: String,
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  favorited: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
});

async function hashPassword(password: string, salt: string): Promise<string> {
  return bcrypt.hash(password, salt);
}

UserSchema.methods.validatePassword = async function(
  password: string,
): Promise<boolean> {
  const saltedPassword = await bcrypt.hash(password, this.salt);
  return saltedPassword === this.password;
};

UserSchema.pre('save', async function(next) {
  // generate the salt and hash the password before saving the user
  const salt = await bcrypt.genSalt();
  console.log('Salt generated: ', salt, 'password: ', this.password);
  this.salt = salt;
  this.password = await hashPassword(this.password, salt);
  //
  next();
});
