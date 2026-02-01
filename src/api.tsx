import axios from "axios";
//const url =  import.meta.env.VITE_AMBIENTE === 'production' ? "/api" : "http://localhost:8081" 
console.log(process.env.NODE_ENV)
const url =  process.env.NODE_ENV === 'production' ? "/api" : "http://localhost:8081"
const api = axios.create({
  baseURL: url
});

export default api;
