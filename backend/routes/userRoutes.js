import express from "express";
import {
  getMe,
  updateProfile,
  changePassword,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Group from "../models/group.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.put("/profile", authMiddleware, updateProfile);
router.put("/password", authMiddleware, changePassword);

// View any user's profile
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/me", authMiddleware, async (req, res) => {
  
  console.log("Delete route hit! User object from middleware:", req.user);
  
  try {
    const userId = req.user._id || req.user.id; 
    const group = await Group.findOne({ members: userId });

    if (group) {
      if (group.members.length === 1) {
        // Only member — disband
        await group.deleteOne();
      } else {
        // Remove from members
        group.members = group.members.filter(
          (m) => m.toString() !== userId.toString(),
        );
        // If they were leader, transfer to next member
        if (group.leader.toString() === userId.toString()) {
          group.leader = group.members[0];
        }
        await group.save();
      }
    }

    await User.findByIdAndDelete(userId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
