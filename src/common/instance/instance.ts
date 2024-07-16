import axios from "axios"

export const instance = axios.create({
  // baseURL: "https://social-network.samuraijs.com/api/1.1/",
  baseURL: "https://66953d374bd61d8314caa435.mockapi.io/api/v1/",
  // withCredentials: true,
  headers: {
    'Content-type':'application/json',
    // "API-KEY": "8f2534e2-22a4-4052-894e-a66c04807482",
  },
})
