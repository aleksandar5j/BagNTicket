import axios from 'axios'

export const imageUrl = 'https://583f123.mars2.mars-hosting.com'

const instance = axios.create({
  baseURL: 'https://583f123.mars2.mars-hosting.com/api/',
})

export default instance
