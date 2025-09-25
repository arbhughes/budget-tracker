import axios from "axios";

// TODO - if using in a non-development environment, get base URL from .env
const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default apiClient;
