import express from "express";
import { createReview, getReviews, editReview, deleteReview } from "../Controllers/reviewController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createReview);
router.get("/", getReviews);
router.put("/edit/:id", authMiddleware, editReview);
router.delete("/delete/:id", authMiddleware, deleteReview);


export default router;
