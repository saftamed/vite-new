import axios from "axios";
import store from "./store";
import router from "./router";

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})

axiosClient.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${store.state.user.token}`
  return config;
})

// axiosClient.interceptors.response.use(response => {
//   return response;
// }, error => {
//   if (error.response.status === 401) {
//     sessionStorage.removeItem('TOKEN')
//     router.push({name: 'Login'})
//   } else if (error.response.status === 404) {
//     router.push({name: 'NotFound'})
//   }
//   return error;
// })
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error.response.status)
    if (error.response.status === 401) {
    sessionStorage.removeItem('TOKEN')
    router.push({name: 'Login'})
  } else if (error.response.status === 404) {
    router.push({name: 'NotFound'})
  }

      return Promise.reject(error);
  
});

export default axiosClient;