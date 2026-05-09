import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    isVerified: {
      type: Boolean,
      default: true,
    },

    profile: {
      rollNumber: String,
      department: String,
      batch: String,
      cgpa: Number,

      skills: [String],
      interests: [String],

      availability: String,
      bio: String,

      profileCompleted: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);