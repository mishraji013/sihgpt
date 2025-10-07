// backend/models/QuizSubmission.js
import mongoose from "mongoose";

const QuizSubmissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
  answers: [{ questionIndex: Number, selectedIndex: Number }],
  score: Number,
  passed: Boolean,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("QuizSubmission", QuizSubmissionSchema);
