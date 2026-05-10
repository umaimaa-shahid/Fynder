import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Message from "../models/message.js";

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: process.env.FRONTEND_URL || "http://localhost:5173" },
  });

  // Auth middleware for socket
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Unauthorized"));
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    // Each user joins their own room (their userId)
    socket.join(socket.userId);

    // Send a message
    socket.on("sendMessage", async ({ receiverId, text }) => {
      try {
        if (!receiverId || !text?.trim()) return;

        const message = await Message.create({
          sender: socket.userId,
          receiver: receiverId,
          text: text.trim(),
        });

        io.to(receiverId).emit("newMessage", message);
        io.to(socket.userId).emit("newMessage", message);
      } catch (err) {
        console.error("sendMessage error:", err.message);
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    socket.on("disconnect", () => {});
  });

  return io;
};
