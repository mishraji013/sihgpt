// backend/routes/courses.js
import express from "express";
import { importPlaylist, listCourses, getCourse } from "../controllers/courseController.js";
const router = express.Router();

router.post("/import", importPlaylist); // admin only ideally
router.get("/", listCourses);
router.get("/:id", getCourse);

export default router;
