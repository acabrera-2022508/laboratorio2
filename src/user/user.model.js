import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be at least 8 characters long"],
  },
  phone: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 8,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    uppercase: true,
    enum: ['ADMIN', 'CLIENT'],
  },
});

export default mongoose.model("user", userSchema);
