import Message from "../models/message.js";
import User from "../models/User.js";
import Group from "../models/group.js";

// GET /api/chat/conversations — all users I've chatted with
export const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all messages involving me, get unique other-user IDs
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .sort({ createdAt: -1 })
      .lean();

    const seen = new Set();
    const conversations = [];

    for (const msg of messages) {
      const otherId = msg.sender.toString() === userId
        ? msg.receiver.toString()
        : msg.sender.toString();

      if (!seen.has(otherId)) {
        seen.add(otherId);
        const other = await User.findById(otherId).select("name profile");
        conversations.push({
          userId: otherId,
          name: other?.name || "Unknown",
          rollNumber: other?.profile?.rollNumber || "",
          lastMsg: msg.text,
          time: msg.createdAt,
          unread: 0, // extend later
        });
      }
    }

    res.json({ success: true, conversations });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/chat/:userId — full message history with one user
export const getMessages = async (req, res) => {
  try {
    const me = req.user.id;
    const other = req.params.userId;
    
    const messages = await Message.find({
      $or: [
        { sender: me, receiver: other },
        { sender: other, receiver: me },
      ],
    }).sort({ createdAt: 1 });

    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};