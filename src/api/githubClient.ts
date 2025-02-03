import axios from "axios";
import { USER_TOKEN } from "../config/env";

export const githubClient = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${USER_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  },
});
