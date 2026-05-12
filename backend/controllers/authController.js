import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!email.endsWith("@lhr.nu.edu.pk")) {
      return res.status(400).json({
        message: "Use university email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
    });

    const verifyLink = `${process.env.BACKEND_URL || "http://localhost:5000"}/api/auth/verify/${verificationToken}`;

    await sendEmail(email, verifyLink);

    res.status(201).json({
      success: true,
      message: "Account created. Verification email sent.",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// VERIFY EMAIL
export const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.token,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();

    return res.redirect(`${process.env.FRONTEND_URL || "http://localhost:3000"}/signin`);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profile: user.profile,
      },
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};