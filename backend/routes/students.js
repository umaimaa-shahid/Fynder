const router = require('express').Router();
const auth   = require('../middleware/auth');
const User   = require('../models/User');

// ── GET /api/students ──────────────────────────────────────────────
// Query params: search, dept, batch, skill, recommended
// Returns all students (excluding self) with optional filters
router.get('/', auth, async (req, res) => {
  try {
    const { search, dept, batch, skill } = req.query;

    const filter = { _id: { $ne: req.user._id } };

    if (dept)  filter.dept  = { $regex: dept,  $options: 'i' };
    if (batch) filter.batch = { $regex: batch, $options: 'i' };
    if (skill) filter.skills = { $elemMatch: { $regex: skill, $options: 'i' } };

    if (search) {
      filter.$or = [
        { name:   { $regex: search, $options: 'i' } },
        { skills: { $elemMatch: { $regex: search, $options: 'i' } } },
      ];
    }

    const students = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── GET /api/students/recommendations ─────────────────────────────
// Returns top-matched students by skill overlap (sorted by % match)
router.get('/recommendations', auth, async (req, res) => {
  try {
    const others = await User.find({ _id: { $ne: req.user._id }, available: true })
      .select('-password')
      .lean();

    const mySkills = new Set((req.user.skills || []).map(s => s.toLowerCase()));

    const ranked = others
      .map(u => {
        const shared = (u.skills || []).filter(s => mySkills.has(s.toLowerCase())).length;
        const total  = new Set([...(req.user.skills || []), ...(u.skills || [])]).size;
        const matchPct = total ? Math.round((shared / total) * 100) : 0;
        return { ...u, matchPct };
      })
      .filter(u => u.matchPct > 0)
      .sort((a, b) => b.matchPct - a.matchPct)
      .slice(0, 10);

    res.json(ranked);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── GET /api/students/:id ──────────────────────────────────────────
router.get('/:id', auth, async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select('-password');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;