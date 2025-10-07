// backend/models/Course.js
import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  youtubePlaylistId: String,
  thumbnail: String,
  level: String,
  duration: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }]
}, { timestamps: true });

export default mongoose.model("Course", CourseSchema);
