import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    sender:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message:  { type: String, default: "" },
    status:   {
      type: String,
      enum: ["pending", "accepted", "declined", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);