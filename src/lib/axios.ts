import axios from "axios";

const instance = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? "http://localhost:5000/api"
      : "https://itad-mp5s.onrender.com/api",
  withCredentials: true,
});

export default instance;
