// api.ts
import axios from "axios";

export const BASE_URL =
  location.hostname === "localhost"
    ? "http://localhost:7777" // your local server
    : "https://devmatch-backend.vercel.app"; // your serverless backend

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // cookies (if you set auth cookies)
});

// usage
// api.post("/login", body)
