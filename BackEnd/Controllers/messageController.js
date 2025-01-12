
import nodemailer from 'nodemailer';
import Message from "../Models/messageSchema.js";
import User from "../Models/userSchema.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.PASS_MAIL,
    pass: process.env.PASS_KEY,
  },
});

// Send Contact Message
export const sendContactMessage = async (req, res) => {
  const { email, subject, message } = req.body;
  try {
    const newMessage = new Message({ sender: null, receiver: null, email, subject, message });
    await newMessage.save();
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reply to Contact Message
export const replyToContactMessage = async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;
  try {
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    message.replies.push(reply);
    await message.save();

    const mailOptions = {
      from: process.env.PASS_MAIL,
      to: message.email,
      subject: `Reply to your message: ${message.subject}`,
      text: reply,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Failed to send reply email' });
      }
      res.status(200).json({ message: "Reply sent successfully and email notification sent" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send Direct Message
export const sendMessage = async (req, res) => {
  const { receiverId, message } = req.body;
  const senderId = req.user._id;

  try {
    const newMessage = new Message({ sender: senderId, receiver: receiverId, message });
    await newMessage.save();
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Conversations
export const getConversations = async (req, res) => {
  const userId = req.user._id;

  try {
    const conversations = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).populate('sender', 'name').populate('receiver', 'name');
    res.status(200).json(conversations);
  } catch (error) {
    res.status (500).json({ message: error.message });
  }
};
// Get Contact Messages
export const getContactMessages = async (req, res) => {
  try {
    const messages = await Message.find({ email: { $exists: true } }); 
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
