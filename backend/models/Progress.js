// backend/models/Progress.js
import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  completedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Progress", ProgressSchema);
