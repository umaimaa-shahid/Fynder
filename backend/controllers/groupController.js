import Group from "../models/group.js";
import User from "../models/User.js";

// GET /api/group/me — get the logged-in user's group
export const getMyGroup = async (req, res) => {
  try {
    const group = await Group.findOne({ members: req.user._id })
      .populate("members", "name email profile")
      .populate("leader",  "name email profile");

    if (!group) return res.status(404).json({ message: "No group found" });
    res.json({ success: true, group });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/group/create
export const createGroup = async (req, res) => {
  try {
    const existing = await Group.findOne({ members: req.user._id });
    if (existing)
      return res.status(400).json({ message: "You are already in a group" });

    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Group name is required" });

    const group = await Group.create({
      name,
      leader:  req.user._id,
      members: [req.user._id],
    });

    await group.populate("members", "name email profile");
    await group.populate("leader",  "name email profile");
    res.status(201).json({ success: true, group });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/group/invite  — body: { userId }
export const inviteMember = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const group = await Group.findOne({ leader: req.user._id });
    if (!group)
      return res.status(403).json({ message: "Only the group leader can invite" });

    if (group.members.length >= group.maxSize)
      return res.status(400).json({ message: "Group is already full (max 3)" });

    const alreadyIn = await Group.findOne({ members: userId });
    if (alreadyIn)
      return res.status(400).json({ message: "This user is already in a group" });

    // Check user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    group.members.push(userId);
    await group.save();
    await group.populate("members", "name email profile");
    await group.populate("leader",  "name email profile");

    res.json({ success: true, group });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/group/leave
export const leaveGroup = async (req, res) => {
  try {
    const group = await Group.findOne({ members: req.user._id });
    if (!group) return res.status(404).json({ message: "You are not in a group" });

    if (
      group.leader.toString() === req.user._id.toString() &&
      group.members.length > 1
    )
      return res.status(400).json({ message: "Transfer leadership before leaving" });

    if (group.members.length === 1) {
      await group.deleteOne();
      return res.json({ success: true, message: "Group disbanded" });
    }

    group.members = group.members.filter(
      (m) => m.toString() !== req.user._id.toString()
    );
    await group.save();
    res.json({ success: true, message: "Left group" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};