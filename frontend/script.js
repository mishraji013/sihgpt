// frontend/script.js
const API = "http://localhost:5000/api";

export async function fetchCourses() {
  const res = await fetch(`${API}/courses`);
  return res.json();
}

export async function fetchCourse(id) {
  const res = await fetch(`${API}/courses/${id}`);
  return res.json();
}

export async function fetchVideo(id) {
  const res = await fetch(`${API}/videos/${id}`);
  return res.json();
}

export async function submitQuiz(videoId, userId, answers) {
  const res = await fetch(`${API}/videos/${videoId}/submit-quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, answers })
  });
  return res.json();
}

export async function getDoubts() {
  const res = await fetch(`${API}/doubts`);
  return res.json();
}

export async function createDoubt(userId, title, description, tags = []) {
  const res = await fetch(`${API}/doubts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, title, description, tags })
  });
  return res.json();
}

export async function answerDoubt(doubtId, userId, text) {
  const res = await fetch(`${API}/doubts/${doubtId}/answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, text })
  });
  return res.json();
}

export async function generateNotes(videoTitle, youtubeId) {
  const res = await fetch(`${API}/notes/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ videoTitle, youtubeId })
  });
  return res.json();
}

export async function runCode(source, language_id = 71, stdin = "") {
  const res = await fetch(`${API}/compile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source, language_id, stdin })
  });
  return res.json();
}
