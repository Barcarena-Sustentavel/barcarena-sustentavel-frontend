import axios from "axios";

const url =  process.env.NODE_ENV === 'production' ? "/api" : "http://localhost:8081" 

const api = axios.create({
  baseURL: url
});

export default api;
