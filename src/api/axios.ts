import axios from "axios";

const api = axios.create({
  baseURL: "https://data-api.binance.vision/api/v3/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
