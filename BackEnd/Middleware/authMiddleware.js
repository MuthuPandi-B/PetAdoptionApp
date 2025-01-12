
import jwt from "jsonwebtoken";
import User from "../Models/userSchema.js";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ message: "Token Missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userId) {
      return res.status(400).json({ message: "Invalid token payload" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach user to req object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
export const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({ message: "Access Denied. User not authenticated." });
  }

  if (req.user.role !== "shelter") {
    return res.status(403).json({ message: "Access Denied. User is not a shelter." });
  }

  next();
};
