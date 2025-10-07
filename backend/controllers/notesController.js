// backend/controllers/notesController.js
import { generateNotes } from "../utils/aiNotes.js";

export async function generateNotesRoute(req, res) {
  const { videoTitle, youtubeId } = req.body;
  try {
    const notes = await generateNotes(videoTitle, youtubeId);
    res.json({ notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI notes error" });
  }
}
