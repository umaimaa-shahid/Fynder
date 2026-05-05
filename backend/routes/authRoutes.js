// routes/authRoutes.js
import express from "express";
import { signup, verifyEmail, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/verify/:token", verifyEmail);
router.post("/login", login);

export default router;