import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Request from "../models/request.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    const requestsSent    = await Request.countDocuments({ sender: userId });
    const pendingReceived = await Request.countDocuments({ receiver: userId, status: "pending" });

    const others = await User.find({ _id: { $ne: userId } }).lean();

    const mySkills = new Set((req.user.profile?.skills || []).map(s => s.toLowerCase()));

    const topMatches = others
      .map(u => {
        const theirSkills = u.profile?.skills || [];
        const shared = theirSkills.filter(s => mySkills.has(s.toLowerCase())).length;
        const total  = new Set([...(req.user.profile?.skills || []), ...theirSkills]).size;
        const pct    = total ? Math.round((shared / total) * 100) : 0;
        return {
          _id:       u._id,
          name:      u.name,
          studentId: u.profile?.rollNumber || "",
          dept:      u.profile?.department || "",
          skills:    u.profile?.skills || [],
          pct,
        };
      })
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 4);

    const recentRequests = await Request.find({ receiver: userId, status: "pending" })
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("sender", "name profile")
      .lean();

    const flatRequests = recentRequests.map(r => ({
      ...r,
      sender: {
        _id:       r.sender?._id,
        name:      r.sender?.name,
        studentId: r.sender?.profile?.rollNumber || "",
        dept:      r.sender?.profile?.department || "",
      },
    }));

    const p = req.user.profile || {};
    const fields = [p.rollNumber, p.department, p.batch, p.bio,
                    (p.skills||[]).length, (p.interests||[]).length];
    const filled = fields.filter(Boolean).length;
    const profileStrength = Math.round((filled / fields.length) * 100);

    res.json({
      stats: { profileViews: 0, requestsSent, pendingReceived },
      profileStrength,
      topMatches,
      recentRequests: flatRequests,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;