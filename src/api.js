// src/api.js
import axios from "axios";

const API = axios.create({ baseURL: "https://notepad-backend-0sic.onrender.com/api" });

// Agar localStorage me JWT ho to har request ke header me bhejo
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;