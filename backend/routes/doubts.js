// backend/routes/doubts.js
import express from "express";
import { createDoubt, listDoubts, answerDoubt } from "../controllers/doubtController.js";
const router = express.Router();

router.post("/", createDoubt);
router.get("/", listDoubts);
router.post("/:id/answer", answerDoubt);

export default router;
