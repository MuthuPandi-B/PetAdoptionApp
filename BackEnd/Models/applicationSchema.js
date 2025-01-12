import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  petName: {
    type: String,
    required: true,
  },
  petBreed: {
    type: String,
    required: true,
  },
  applicantName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Additional Information Needed", "Meet-and-Greet Scheduled"],
    default: "Pending",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  shelternotes: {
    type: String,
  },
  meetAndGreetDate: {
    type: Date,
  },
  meetAndGreetTime: {
    type: String,
  },
});

export default mongoose.model("Application", applicationSchema);
