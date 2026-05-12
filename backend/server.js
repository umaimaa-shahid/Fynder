import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import { createServer } from "http";
import { initSocket } from "./socket/index.js";

import userRoutes    from "./routes/userRoutes.js";
import groupRoutes   from "./routes/groupRoutes.js";
import chatRoutes    from "./routes/chatRoutes.js";
import authRoutes    from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

// Our new routes
import dashboardRoutes from "./routes/dashboard.js";
import studentRoutes   from "./routes/students.js";
import requestRoutes   from "./routes/requests.js";

dotenv.config();
connectDB();

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
initSocket(httpServer);

// ROUTES
app.use("/api/auth",      authRoutes);
app.use("/api/profile",   profileRoutes);
app.use("/api/user",      userRoutes);
app.use("/api/group",     groupRoutes);
app.use("/api/chat",      chatRoutes);

// Our new routes
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/students",  studentRoutes);
app.use("/api/requests",  requestRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running...");
});

// PORT
const PORT = process.env.PORT || 5000;

// SERVER
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});