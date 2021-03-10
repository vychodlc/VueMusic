import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://cloud-music.pengliang.online/',
    // baseURL: 'http://39.106.228.122:3000',
    timeout: 5000
  })

  instance.interceptors.request.use((config) => {
    return config;
  }, err => {
    console.log(err)
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  return instance(config)
}
