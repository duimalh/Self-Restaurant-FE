import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/self-restaurant",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;