// import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema({
//   sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   message: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("Message", messageSchema);
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Make optional
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Make optional
  email: { type: String }, // Add email for contact messages
  subject: { type: String },
  message: { type: String, required: true },
  replies: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Message", messageSchema);
