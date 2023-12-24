
import axios from 'axios'

const axiosClient = axios.create({
    
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true, // Để request gửi kèm cookie
})

axiosClient.interceptors.request.use(async (config) => {
    console.log(localStorage.getItem('AccessToken'))
  let accessToken = localStorage.getItem('AccessToken');
  config.headers.Authorization = 'Bearer ' + accessToken;
  return config
},)

export default axiosClient;