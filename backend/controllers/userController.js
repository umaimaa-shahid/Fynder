import User from "../models/User.js";
import bcrypt from "bcryptjs";

// GET /api/user/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/user/profile  — update name + profile fields
export const updateProfile = async (req, res) => {
  try {
    const { name, bio, skills, interests, availability } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          ...(name && { name }),
          ...(bio        !== undefined && { "profile.bio": bio }),
          ...(skills     !== undefined && { "profile.skills": skills }),
          ...(interests  !== undefined && { "profile.interests": interests }),
          ...(availability !== undefined && { "profile.availability": availability }),
        },
      },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/user/password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: "Both fields are required" });

    if (newPassword.length < 6)
      return res.status(400).json({ message: "Password must be at least 6 characters" });

    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current password is incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};