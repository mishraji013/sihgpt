// backend/controllers/videoController.js
import Video from "../models/Video.js";
import QuizSubmission from "../models/QuizSubmission.js";
import Progress from "../models/Progress.js";

export async function getVideo(req, res) {
  const { id } = req.params;
  const video = await Video.findById(id);
  res.json(video);
}

export async function submitQuiz(req, res) {
  try {
    const { id } = req.params;
    const { userId, answers = [] } = req.body;
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const quiz = video.quiz || [];
    let correct = 0;
    for (let i = 0; i < quiz.length; i++) {
      if (answers[i] !== undefined && answers[i] === quiz[i].correctIndex) correct++;
    }
    const scorePct = quiz.length ? Math.round((correct / quiz.length) * 100) : 0;
    const passed = scorePct >= (video.passThresholdPct || 60);

    const submission = await QuizSubmission.create({ userId, videoId: id, answers: answers.map((s,i)=>({ questionIndex:i, selectedIndex:s })), score: scorePct, passed });

    // record progress if passed
    if (passed && userId) {
      let progress = await Progress.findOne({ userId, courseId: video.course });
      if (!progress) {
        progress = await Progress.create({ userId, courseId: video.course, completedVideos: [video._id] });
      } else {
        if (!progress.completedVideos.includes(video._id)) {
          progress.completedVideos.push(video._id);
          progress.updatedAt = new Date();
          await progress.save();
        }
      }
    }

    res.json({ score: scorePct, correct, total: quiz.length, passed, submissionId: submission._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Submit quiz error" });
  }
}
