
import express from "express";
import { sendContactMessage, replyToContactMessage, sendMessage, getConversations, getContactMessages } from "../Controllers/messageController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Contact Messages
router.post("/contact/send", sendContactMessage); // Public route to send contact messages
router.post("/contact/reply/:id", replyToContactMessage); // Admin route to reply to contact messages
router.get("/contact", authMiddleware, getContactMessages);
// Direct Messages
router.post("/direct/send", authMiddleware, sendMessage); // Authenticated users can send direct messages
router.get("/direct", authMiddleware, getConversations); // Authenticated users can view their conversations

export default router;
