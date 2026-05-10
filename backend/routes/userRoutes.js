import express from "express";
import { getMe, updateProfile, changePassword } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/me",       authMiddleware, getMe);
router.put("/profile",  authMiddleware, updateProfile);
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

export default router;