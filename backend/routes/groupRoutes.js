import express from "express";
import { getMyGroup, createGroup, inviteMember, leaveGroup } from "../controllers/groupController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyGroup);
router.post("/create", authMiddleware, createGroup);
router.post("/invite", authMiddleware, inviteMember);
router.delete("/leave", authMiddleware, leaveGroup);

export default router;