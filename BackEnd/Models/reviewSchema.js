import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  reviewType: { type: String, enum: ["pet", "shelter"], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Review", reviewSchema);
