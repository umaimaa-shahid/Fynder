// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  isVerified: { type: Boolean, default: false },
  verificationToken: String,

  // ✅ ADD THIS BLOCK
  profile: {
    rollNumber: String,
    department: String,
    batch: String,
    cgpa: Number,

    skills: [String],
    interests: [String],

    availability: String,
    bio: String,

    profileCompleted: { type: Boolean, default: false },
  },
}, { timestamps: true });

export default mongoose.model("User", userSchema);