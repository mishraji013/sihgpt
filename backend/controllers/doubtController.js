// backend/controllers/doubtController.js
import Doubt from "../models/Doubt.js";

export async function createDoubt(req, res) {
  const { userId, title, description, tags } = req.body;
  const d = await Doubt.create({ userId, title, description, tags, isPublic: true });
  res.json(d);
}

export async function listDoubts(req, res) {
  const doubts = await Doubt.find({ isPublic: true }).sort({ createdAt: -1 });
  res.json(doubts);
}

export async function answerDoubt(req, res) {
  const { id } = req.params;
  const { userId, text } = req.body;
  const d = await Doubt.findById(id);
  if (!d) return res.status(404).json({ message: "Not found" });
  d.answers.push({ userId, text });
  await d.save();
  res.json(d);
}
