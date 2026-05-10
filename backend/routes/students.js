import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// GET /api/students/recommendations — must be before /:id
router.get("/recommendations", authMiddleware, async (req, res) => {
  try {
    const others = await User.find({ _id: { $ne: req.user._id } }).lean();

    const mySkills = new Set(
      (req.user.profile?.skills || []).map((s) => s.toLowerCase()),
    );

    const ranked = others
      .map((u) => {
        const theirSkills = u.profile?.skills || [];
        const shared = theirSkills.filter((s) =>
          mySkills.has(s.toLowerCase()),
        ).length;
        const total = new Set([
          ...(req.user.profile?.skills || []),
          ...theirSkills,
        ]).size;
        const matchPct = total ? Math.round((shared / total) * 100) : 0;
        return {
          _id: u._id,
          name: u.name,
          studentId: u.profile?.rollNumber || "",
          dept: u.profile?.department || "",
          batch: u.profile?.batch || "",
          skills: u.profile?.skills || [],
          available: u.profile?.availability === "available",
          matchPct,
        };
      })
      .filter((u) => u.matchPct > 0)
      .sort((a, b) => b.matchPct - a.matchPct)
      .slice(0, 10);

    res.json(ranked);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/students
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { search, dept, batch, skill } = req.query;

    const filter = { _id: { $ne: req.user._id } };

    if (dept)  filter["profile.department"] = { $regex: dept,  $options: "i" };
    if (batch) filter["profile.batch"]      = { $regex: batch, $options: "i" };
    if (skill) filter["profile.skills"]     = { $elemMatch: { $regex: skill, $options: "i" } };

    if (search) {
      filter.$or = [
        { name:                   { $regex: search, $options: "i" } },
        { "profile.rollNumber":   { $regex: search, $options: "i" } },
        { "profile.skills":       { $elemMatch: { $regex: search, $options: "i" } } },
        { "profile.interests":    { $elemMatch: { $regex: search, $options: "i" } } },
        { "profile.department":   { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(filter).select("-password").lean();

    const students = users.map((u) => ({
      _id:       u._id,
      name:      u.name,
      studentId: u.profile?.rollNumber || "",
      dept:      u.profile?.department || "",
      batch:     u.profile?.batch || "",
      skills:    u.profile?.skills || [],
      interests: u.profile?.interests || [],
      available: u.profile?.availability === "available",
    }));

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/students/:id
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const u = await User.findById(req.params.id).select("-password").lean();
    if (!u) return res.status(404).json({ message: "Student not found" });
    res.json({
      _id:       u._id,
      name:      u.name,
      studentId: u.profile?.rollNumber || "",
      dept:      u.profile?.department || "",
      batch:     u.profile?.batch || "",
      skills:    u.profile?.skills || [],
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;