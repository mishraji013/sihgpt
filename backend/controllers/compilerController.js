// backend/controllers/compilerController.js
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const BASE = process.env.JUDGE0_BASE_URL;
const RAPID_HOST = process.env.JUDGE0_RAPIDAPI_HOST;
const RAPID_KEY = process.env.JUDGE0_RAPIDAPI_KEY;

export async function createSubmission(req, res) {
  try {
    const { source, language_id = 71, stdin = "" } = req.body;

    // Create submission (Judge0 via RapidAPI)
    const createRes = await fetch(`${BASE}/submissions?base64_encoded=false&wait=false`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Host": RAPID_HOST,
        "X-RapidAPI-Key": RAPID_KEY
      },
      body: JSON.stringify({ source_code: source, language_id, stdin })
    });
    const created = await createRes.json();
    const token = created.token;
    if (!token) return res.status(500).json({ message: "Judge0 error - token missing", created });

    // Poll for result
    let result = null;
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 1000));
      const getRes = await fetch(`${BASE}/submissions/${token}?base64_encoded=false`, {
        method: "GET",
        headers: { "X-RapidAPI-Host": RAPID_HOST, "X-RapidAPI-Key": RAPID_KEY }
      });
      result = await getRes.json();
      if (result.status && result.status.id >= 3) break;
    }

    // Simple marks: accepted (status.id === 3) => 100 else 0
    const marks = (result && result.status && result.status.id === 3) ? 100 : 0;

    res.json({ result, marks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Compile error", error: err.message });
  }
}
