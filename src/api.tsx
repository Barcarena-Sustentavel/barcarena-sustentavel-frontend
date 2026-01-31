import axios from "axios";
console.log(import.meta.env.VITE_AMBIENTE)
const url =  import.meta.env.VITE_AMBIENTE === 'production' ? "/api" : "http://localhost:8081" 

const api = axios.create({
  baseURL: url
});

export default api;
