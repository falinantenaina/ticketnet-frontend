import axios from "axios";

const instance = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? "http://localhost:5000/api"
      : "http://localhost:5000/api",
  withCredentials: true,
});

export default instance;
