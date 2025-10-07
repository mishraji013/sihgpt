// backend/utils/aiNotes.js
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export async function generateNotes(title, youtubeId) {
  const prompt = `Generate concise study notes for the tutorial video titled: "${title}". Include key concepts, short explanations, and 3 practice exercises.`;
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 700
    })
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "No notes available.";
}
