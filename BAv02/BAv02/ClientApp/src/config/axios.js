import axios from "axios";

const clientAxios = axios.create({
  baseUrl: "http://localhost:5001",
});

export default clientAxios;
