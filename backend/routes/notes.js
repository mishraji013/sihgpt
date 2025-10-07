// backend/routes/notes.js
import express from "express";
import { generateNotesRoute } from "../controllers/notesController.js";
const router = express.Router();
router.post("/generate", generateNotesRoute);
export default router;
