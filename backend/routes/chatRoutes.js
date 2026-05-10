import express from "express";
import { getConversations, getMessages } from "../controllers/chatController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/conversations", authMiddleware, getConversations);
router.get("/:userId", authMiddleware, getMessages);

export default router;