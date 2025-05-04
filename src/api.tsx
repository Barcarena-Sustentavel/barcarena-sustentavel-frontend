import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  //baseURL: "http://localhost:8081",
});

export default api;
