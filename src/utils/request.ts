import axios from 'axios';

const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(config => {
  // 这里可以添加 token 等
  return config;
});

// 响应拦截器
request.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err)
);

export default request;
