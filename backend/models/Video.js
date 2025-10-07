// backend/models/Video.js
import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  title: String,
  youtubeId: String,
  description: String,
  duration: String,
  order: Number,
  thumbnail: String,
  quiz: [{
    question: String,
    options: [String],
    correctIndex: Number
  }],
  passThresholdPct: { type: Number, default: 60 }
}, { timestamps: true });

export default mongoose.model("Video", VideoSchema);
