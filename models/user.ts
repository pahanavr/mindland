import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, 'Email is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: 2,
    maxlength: 30,  
  },
  image: {
    type: String,
  }
})

const User = models.User || model('User', UserSchema);

export default User;