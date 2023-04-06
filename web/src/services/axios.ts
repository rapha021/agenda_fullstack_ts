import axios from "axios"

const webUrl = window.location.origin

const baseURL =
  webUrl === "http://localhost:5173"
    ? "http://localhost:3000"
    : "https://agenda-fullstack.onrender.com"

export const api = axios.create({ baseURL, timeout: 5000 })
