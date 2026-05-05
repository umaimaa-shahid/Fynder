import express from "express";
import {
  saveStep1,
  saveStep2,
  saveStep3,
} from "../controllers/profileController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/step1", authMiddleware, saveStep1);
router.post("/step2", authMiddleware, saveStep2);
router.post("/step3", authMiddleware, saveStep3);

export default router;