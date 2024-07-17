import axios from "axios"

export const instance = axios.create({
  baseURL: "https://66953d374bd61d8314caa435.mockapi.io/api/v1/",
  headers: {
    'Content-type':'application/json',
  },
})
