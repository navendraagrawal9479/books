import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  mailId: {
    type: String,
    required: true
  },
  city: String,
  state: String,
  mobile: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  book: {
    type: Array,
    default: []
  }
})

const User = mongoose.model('user', userSchema);

export default User;