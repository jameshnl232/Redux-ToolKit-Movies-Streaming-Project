import axios from "axios"
import type { AxiosInstance } from "axios"

export const api_config = {
  baseURL: "https://api.themoviedb.org/3",
  timeout: 1000,
  originalImage: (imgPath: string) =>
    `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath: string) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

class HTTP {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: api_config.baseURL,
      timeout: api_config.timeout,
    })
  }
}

const http = new HTTP().instance

export default http
