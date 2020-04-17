import { Document } from 'mongoose';

export interface User extends Document {
  readonly username: String;
  readonly password: String;
  readonly email: String;
  readonly salt: String;
  readonly bio: String;
  readonly image: String;
}
