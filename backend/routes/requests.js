const router  = require('express').Router();
const auth    = require('../middleware/auth');
const Request = require('../models/Request');
const User    = require('../models/User');

// ── POST /api/requests/send ────────────────────────────────────────
// Body: { receiverId, message }
router.post('/send', auth, async (req, res) => {
  try {
    const { receiverId, message } = req.body;

    if (!receiverId)
      return res.status(400).json({ message: 'receiverId is required' });

    if (receiverId === req.user._id.toString())
      return res.status(400).json({ message: 'Cannot send a request to yourself' });

    const receiver = await User.findById(receiverId);
    if (!receiver)
      return res.status(404).json({ message: 'Receiver not found' });

    // Check for existing non-cancelled request
    const existing = await Request.findOne({
      sender: req.user._id,
      receiver: receiverId,
      status: { $ne: 'cancelled' },
    });
    if (existing)
      return res.status(409).json({ message: 'Request already sent to this student' });

    const request = await Request.create({
      sender:   req.user._id,
      receiver: receiverId,
      message:  message || '',
    });

    await request.populate(['sender', 'receiver'], 'name studentId dept skills');
    res.status(201).json(request);
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ message: 'Request already sent' });
    res.status(500).json({ message: err.message });
  }
});

// ── GET /api/requests/received ─────────────────────────────────────
// All requests sent TO the logged-in user
router.get('/received', auth, async (req, res) => {
  try {
    const requests = await Request.find({ receiver: req.user._id })
      .sort({ createdAt: -1 })
      .populate('sender', 'name studentId dept batch skills available')
      .lean();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── GET /api/requests/sent ─────────────────────────────────────────
// All requests sent BY the logged-in user
router.get('/sent', auth, async (req, res) => {
  try {
    const requests = await Request.find({ sender: req.user._id })
      .sort({ createdAt: -1 })
      .populate('receiver', 'name studentId dept batch skills available')
      .lean();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── PATCH /api/requests/:id ────────────────────────────────────────
// Body: { action: 'accept' | 'decline' | 'cancel' }
router.patch('/:id', auth, async (req, res) => {
  try {
    const { action } = req.body;
    const request    = await Request.findById(req.params.id);

    if (!request)
      return res.status(404).json({ message: 'Request not found' });

    const uid = req.user._id.toString();

    if (action === 'accept' || action === 'decline') {
      if (request.receiver.toString() !== uid)
        return res.status(403).json({ message: 'Not authorized' });
      request.status = action === 'accept' ? 'accepted' : 'declined';
    } else if (action === 'cancel') {
      if (request.sender.toString() !== uid)
        return res.status(403).json({ message: 'Not authorized' });
      request.status = 'cancelled';
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;