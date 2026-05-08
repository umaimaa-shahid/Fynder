import express from "express";
import {
  step1Profile,
  step2Profile,
  step3Profile,
} from "../controllers/profileController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/step1", authMiddleware, step1Profile,);
router.post("/step2", authMiddleware, step2Profile);
router.post("/step3", authMiddleware, step3Profile);

export default router;