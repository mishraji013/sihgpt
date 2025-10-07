// backend/routes/compile.js
import express from "express";
import { createSubmission } from "../controllers/compilerController.js";
const router = express.Router();

router.post("/", createSubmission);

export default router;
