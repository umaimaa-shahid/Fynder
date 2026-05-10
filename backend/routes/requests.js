import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Request from "../models/request.js";
import User from "../models/User.js";

const router = express.Router();

// POST /api/requests/send
router.post("/send", authMiddleware, async (req, res) => {
  try {
    const { receiverId, message } = req.body;

    if (!receiverId)
      return res.status(400).json({ message: "receiverId is required" });

    if (receiverId === req.user._id.toString())
      return res.status(400).json({ message: "Cannot send a request to yourself" });

    const receiver = await User.findById(receiverId);
    if (!receiver) return res.status(404).json({ message: "Receiver not found" });

    const existing = await Request.findOne({
      sender: req.user._id,
      receiver: receiverId,
      status: { $ne: "cancelled" },
    });
    if (existing)
      return res.status(409).json({ message: "Request already sent to this student" });

    const request = await Request.create({
      sender:   req.user._id,
      receiver: receiverId,
      message:  message || "",
    });

    res.status(201).json(request);
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ message: "Request already sent" });
    res.status(500).json({ message: err.message });
  }
});

// GET /api/requests/received
router.get("/received", authMiddleware, async (req, res) => {
  try {
    const requests = await Request.find({ receiver: req.user._id })
      .sort({ createdAt: -1 })
      .populate("sender", "name profile")
      .lean();

    const flat = requests.map(r => ({
      ...r,
      sender: {
        _id:       r.sender?._id,
        name:      r.sender?.name,
        studentId: r.sender?.profile?.rollNumber || "",
        dept:      r.sender?.profile?.department || "",
        batch:     r.sender?.profile?.batch || "",
        skills:    r.sender?.profile?.skills || [],
      },
    }));

    res.json(flat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/requests/sent
router.get("/sent", authMiddleware, async (req, res) => {
  try {
    const requests = await Request.find({ sender: req.user._id })
      .sort({ createdAt: -1 })
      .populate("receiver", "name profile")
      .lean();

    const flat = requests.map(r => ({
      ...r,
      receiver: {
        _id:       r.receiver?._id,
        name:      r.receiver?.name,
        studentId: r.receiver?.profile?.rollNumber || "",
        dept:      r.receiver?.profile?.department || "",
      },
    }));

    res.json(flat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/requests/:id
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const { action } = req.body;
    const request = await Request.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });

    const uid = req.user._id.toString();

    if (action === "accept" || action === "decline") {
      if (request.receiver.toString() !== uid)
        return res.status(403).json({ message: "Not authorized" });
      request.status = action === "accept" ? "accepted" : "declined";
    } else if (action === "cancel") {
      if (request.sender.toString() !== uid)
        return res.status(403).json({ message: "Not authorized" });
      request.status = "cancelled";
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;