// backend/server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/users.js";
import courseRoutes from "./routes/courses.js";
import videoRoutes from "./routes/videos.js";
import doubtRoutes from "./routes/doubts.js";
import compileRoutes from "./routes/compile.js";
import notesRoutes from "./routes/notes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/doubts", doubtRoutes);
app.use("/api/compile", compileRoutes);
app.use("/api/notes", notesRoutes);

// health check
app.get("/", (req, res) => res.send({ status: "ok" }));

// Connect to Mongo
mongoose.connect(process.env.MONGO_URI, { })
  .then(() => {
    console.log("MongoDB connected");
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => {
    console.error("Mongo connect error:", err);
  });
