// backend/controllers/courseController.js
import Course from "../models/Course.js";
import Video from "../models/Video.js";
import { fetchPlaylistItems } from "../utils/youtube.js";

export async function importPlaylist(req, res) {
  try {
    const { playlistId, title, description, level } = req.body;
    if (!playlistId) return res.status(400).json({ message: "playlistId required" });

    const items = await fetchPlaylistItems(playlistId);
    const course = await Course.create({
      title: title || `Course - ${playlistId}`,
      description: description || "",
      youtubePlaylistId: playlistId,
      thumbnail: items[0]?.thumbnail || null,
      level: level || "Beginner"
    });

    const videoIds = [];
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const v = await Video.create({
        course: course._id,
        title: it.title,
        youtubeId: it.youtubeId,
        description: it.description,
        order: i + 1,
        thumbnail: it.thumbnail,
        quiz: [], // admin can add quiz later
        passThresholdPct: 60
      });
      videoIds.push(v._id);
    }
    course.videos = videoIds;
    await course.save();
    res.json({ message: "Imported", courseId: course._id, count: videoIds.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Import error", error: err.message });
  }
}

export async function listCourses(req, res) {
  const courses = await Course.find().populate({ path: "videos", select: "title youtubeId order thumbnail" }).sort({ createdAt: -1 });
  res.json(courses);
}

export async function getCourse(req, res) {
  const { id } = req.params;
  const course = await Course.findById(id).populate("videos");
  res.json(course);
}
