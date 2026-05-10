import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    leader:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    maxSize: { type: Number, default: 3 },
  },
  { timestamps: true }
);

export default mongoose.models.Group || mongoose.model("Group", groupSchema);