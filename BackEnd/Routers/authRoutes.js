
import express from "express";
import { forgotPassword, getUserById, getUserProfile, loginUser, registerUser, resetPassword } from "../Controllers/authController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";



const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);
router.get("/:id", authMiddleware,getUserById);
router.get("/user", authMiddleware,getUserProfile);

export default router;
  