import axios from "axios"

export const api = axios.create({
  baseURL: "https://agenda-fullstack.onrender.com",
})
