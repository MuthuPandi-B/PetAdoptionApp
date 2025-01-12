
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
      type:String,
  },
  role: {
    type: String,
    enum: ["adopter", "shelter", "foster"],
    default: "adopter",
  },

});
export default mongoose.model("User", userSchema);