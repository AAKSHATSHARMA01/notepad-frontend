// src/api.js
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000/api" });

// Agar localStorage me JWT ho to har request ke header me bhejo
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;