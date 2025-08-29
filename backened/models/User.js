// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, minlength: 6 },
    image: String,
    googleId: { type: String, index: true, sparse: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isVerified: { type: Boolean, default: false },
    isAdmin:    { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);

