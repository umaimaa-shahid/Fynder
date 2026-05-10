import express from "express";
import mongoose from "mongoose";
import authMiddleware from "../middleware/authMiddleware.js";
import Request from "../models/request.js";
import User from "../models/User.js";
import Group from "../models/group.js";

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
    if (!receiver)
      return res.status(404).json({ message: "Receiver not found" });

    // If sender already has a group, check if receiver is already in it
    const myGroup = await Group.findOne({ members: req.user._id });
    if (myGroup) {
      const alreadyTogether = myGroup.members
        .map((m) => m.toString())
        .includes(receiverId);
      if (alreadyTogether)
        return res.status(409).json({ message: "This person is already in your group" });

      if (myGroup.members.length >= myGroup.maxSize)
        return res.status(400).json({ message: "Your group is already full (max 3 members)" });
    }

    // Prevent duplicate pending/accepted requests in either direction
    const existing = await Request.findOne({
      $or: [
        { sender: req.user._id, receiver: receiverId },
        { sender: receiverId,   receiver: req.user._id },
      ],
      status: { $in: ["pending", "accepted"] },
    });
    if (existing)
      return res.status(409).json({ message: "A request already exists with this student" });

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

    const flat = requests.map((r) => ({
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

    const flat = requests.map((r) => ({
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

// PATCH /api/requests/:id  — accept / decline / cancel
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const { action } = req.body;
    const request = await Request.findById(req.params.id);

    if (!request)
      return res.status(404).json({ message: "Request not found" });

    const uid        = req.user._id.toString();
    const senderId   = request.sender.toString();
    const receiverId = request.receiver.toString();

    // ── ACCEPT ──────────────────────────────────────────────────────────────
    if (action === "accept") {
      if (receiverId !== uid)
        return res.status(403).json({ message: "Not authorized" });

      // Reload both users' groups fresh from DB
      const senderGroup   = await Group.findOne({ members: request.sender });
      const receiverGroup = await Group.findOne({ members: request.receiver });

      // Already in the same group? Just mark accepted.
      if (
        senderGroup && receiverGroup &&
        senderGroup._id.toString() === receiverGroup._id.toString()
      ) {
        request.status = "accepted";
        await request.save();
        return res.json(request);
      }

      // Size checks before accepting
      if (senderGroup && senderGroup.members.length >= senderGroup.maxSize)
        return res.status(400).json({ message: "Sender's group is already full (max 3)" });

      if (receiverGroup && receiverGroup.members.length >= receiverGroup.maxSize)
        return res.status(400).json({ message: "Your group is already full (max 3)" });

      // ── Case 1: neither has a group → create brand-new group ──────────────
      if (!senderGroup && !receiverGroup) {
        const sender = await User.findById(senderId);
        await Group.create({
          name:    `${sender.name}'s Group`,
          leader:  new mongoose.Types.ObjectId(senderId),
          members: [
            new mongoose.Types.ObjectId(senderId),
            new mongoose.Types.ObjectId(receiverId),
          ],
        });

      // ── Case 2: sender HAS a group, receiver does not → add receiver ──────
      } else if (senderGroup && !receiverGroup) {
        await Group.findByIdAndUpdate(senderGroup._id, {
          $addToSet: { members: new mongoose.Types.ObjectId(receiverId) },
        });

      // ── Case 3: receiver HAS a group, sender does not → add sender ────────
      } else if (!senderGroup && receiverGroup) {
        await Group.findByIdAndUpdate(receiverGroup._id, {
          $addToSet: { members: new mongoose.Types.ObjectId(senderId) },
        });

      // ── Case 4: BOTH have separate groups → merge all members into receiver's group
      } else {
        // Collect unique ObjectIds from both groups
        const seen = new Set();
        const allMemberIds = [];
        for (const id of [...senderGroup.members, ...receiverGroup.members]) {
          const str = id.toString();
          if (!seen.has(str)) {
            seen.add(str);
            allMemberIds.push(new mongoose.Types.ObjectId(str));
          }
        }

        if (allMemberIds.length > receiverGroup.maxSize) {
          return res.status(400).json({
            message: `Combined groups would exceed max size (${receiverGroup.maxSize})`,
          });
        }

        // Push all members into receiver's group, delete sender's group
        await Group.findByIdAndUpdate(receiverGroup._id, {
          $set: { members: allMemberIds },
        });
        await Group.findByIdAndDelete(senderGroup._id);
      }

      request.status = "accepted";
      await request.save();
      return res.json(request);

    // ── DECLINE ─────────────────────────────────────────────────────────────
    } else if (action === "decline") {
      if (receiverId !== uid)
        return res.status(403).json({ message: "Not authorized" });
      request.status = "declined";

    // ── CANCEL ──────────────────────────────────────────────────────────────
    } else if (action === "cancel") {
      if (senderId !== uid)
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