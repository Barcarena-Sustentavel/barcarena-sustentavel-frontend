import axios from "axios";

const api = axios.create({
  //baseURL: "http://3.148.173.110:8081/",
  //baseURL: "http://backend:8081/",
  baseURL:"/api"

});

export default api;
