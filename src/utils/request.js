/**
 * http配置
 */
import axios from 'axios'
import {
  API_BASE_URL
} from '../utils/constants'
const goLogin = function (loginUrl) {
  window.location.href = `${loginUrl}&ReturnUrl=${encodeURIComponent(window.location.href)}`;
}

// 超时时间
axios.defaults.timeout = 60000
axios.defaults.baseURL = API_BASE_URL;
// 请求携带cookie
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// http请求拦截器
//添加时间戳 防止缓存
axios.interceptors.request.use(function (config) {
  if (config.method.toLowerCase() === 'get') {
    const url = config.url
    const t = new Date().getTime()
    config.url = `${url}${url.indexOf('?') === -1 ? '?' : '&'}t=${t}`

  }
  return config
}, function (error) {
  return Promise.reject(error);
});

//统一处理结果
axios.interceptors.response.use(function (response) {
  const data = response.data;
  if (data.code === 203) {
    goLogin(data.data.loginUrl);
    return {
      code: 200
    };
  } else {
    return data;
  }
}, function (error) {
  return Promise.reject(error);
});

export {
  axios as http
}
export default axios




// import Vue from 'vue';
// import {
//   API_BASE_URL
// } from '../utils/constants'
// const goLogin = function (loginUrl) {
//   window.location.href = `${loginUrl}&ReturnUrl=${encodeURIComponent(window.location.href)}`;
// }

// Vue.http.options.credentials = true
// Vue.http.options.xhr = {
//   withCredentials: true
// }
// Vue.http.options.headers = {
//   'X-Requested-With': 'XMLHttpRequest'
// };
// Vue.http.options.root = API_BASE_URL;

// Vue.http.interceptors.push(function (request, next) {
//   let timeout;
//   // 這裡改用 _timeout
//   if (request._timeout) {
//     timeout = setTimeout(() => {
//       next(request.respondWith(request.body, {
//         status: 408,
//         statusText: '请求超时'
//       }));

//     }, request._timeout);
//   }
//   // 在get请求下加时间戳，防止缓存
//   if (request.method.toLowerCase() === 'get') {
//     const url = request.url
//     const t = new Date().getTime()
//     request.url = `${url}${url.indexOf('?') === -1 ? '?' : '&'}t=${t}`
//   }
//   next(function (response) {
//     clearTimeout(timeout);
//     const data = response.body;
//     if (data.code === 203) {
//       goLogin(data.data.loginUrl);
//       return {
//         code: 200
//       }
//     } else {
//       return response;
//     }
//   });
// })

// export default Vue.http;
