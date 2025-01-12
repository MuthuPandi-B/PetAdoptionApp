import express from "express";
import { getUsersByRole } from "../Controllers/userController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", authMiddleware, getUsersByRole); // Authenticated users can get users by role

export default router;
