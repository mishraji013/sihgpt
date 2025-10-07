// backend/routes/videos.js
import express from "express";
import { getVideo, submitQuiz } from "../controllers/videoController.js";
const router = express.Router();

router.get("/:id", getVideo);
router.post("/:id/submit-quiz", submitQuiz);

export default router;
