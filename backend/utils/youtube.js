// backend/utils/youtube.js
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.YOUTUBE_API_KEY;

export async function fetchPlaylistItems(playlistId) {
  let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`;
  let items = [];
  let nextPageToken = '';
  do {
    const fullUrl = nextPageToken ? `${url}&pageToken=${nextPageToken}` : url;
    const res = await fetch(fullUrl);
    const data = await res.json();
    if (!data.items) break;
    data.items.forEach(it => {
      const videoId = it.contentDetails?.videoId || it.snippet?.resourceId?.videoId;
      const thumbnail = it.snippet?.thumbnails?.high?.url || it.snippet?.thumbnails?.default?.url || null;
      items.push({
        title: it.snippet.title,
        youtubeId: videoId,
        thumbnail,
        description: it.snippet.description
      });
    });
    nextPageToken = data.nextPageToken || '';
  } while (nextPageToken);
  return items;
}
