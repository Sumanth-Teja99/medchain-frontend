import axios from "axios";

const API = axios.create({
  baseURL: "https://medchain-blockchain-backend.onrender.com"
});

// 🔥 THIS IS THE MAIN FIX
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.token = token;   // ✅ MUST BE 'token'
  }

  return config;
});

export default API;