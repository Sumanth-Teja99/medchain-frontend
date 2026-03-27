import axios from "axios";

const API = axios.create({
  baseURL: "https://medchain-blockchain-backend.onrender.com",
});

export default API;