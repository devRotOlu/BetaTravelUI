import axios from "axios";

export const betaTravelAxios = axios.create({
  baseURL: "https://localhost:44375/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
