import axios from "axios";

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default apiClient;
