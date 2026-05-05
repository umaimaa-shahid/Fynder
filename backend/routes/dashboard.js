const router  = require('express').Router();
const auth    = require('../middleware/auth');
const User    = require('../models/User');
const Request = require('../models/Request');

// ── GET /api/dashboard ─────────────────────────────────────────────
// Returns: stats (profile views placeholder, requests sent, pending),
//          top matches (skill overlap), recent received requests
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user._id;

    // --- Counts ---
    const requestsSent    = await Request.countDocuments({ sender: userId });
    const pendingReceived = await Request.countDocuments({ receiver: userId, status: 'pending' });

    // --- Top Matches (users with most overlapping skills, excluding self) ---
    const others = await User.find({ _id: { $ne: userId }, available: true })
      .select('name studentId dept batch skills initials')
      .lean();

    const mySkills = new Set((req.user.skills || []).map(s => s.toLowerCase()));

    const withScore = others.map(u => {
      const shared = (u.skills || []).filter(s => mySkills.has(s.toLowerCase())).length;
      const total  = new Set([...(req.user.skills || []), ...(u.skills || [])]).size;
      const pct    = total ? Math.round((shared / total) * 100) : 0;
      return { ...u, pct };
    });

    const topMatches = withScore
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 4);

    // --- Recent received requests ---
    const recentRequests = await Request.find({ receiver: userId, status: 'pending' })
      .sort({ createdAt: -1 })
      .limit(3)
      .populate('sender', 'name studentId dept skills')
      .lean();

    res.json({
      stats: {
        profileViews: 0,           // extend later with a real view-count model
        requestsSent,
        pendingReceived,
      },
      profileStrength: req.user.profileStrength,
      topMatches,
      recentRequests,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;