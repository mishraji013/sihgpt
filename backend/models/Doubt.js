// backend/models/Doubt.js
import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const DoubtSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  tags: [String],
  isPublic: { type: Boolean, default: true },
  answers: [AnswerSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Doubt", DoubtSchema);
