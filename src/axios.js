//axios.js
import axios from 'axios'
import store from './store'
import router from './router'
// const url = process.env.NODE_ENV === 'development' ? '/api' : '';
const url = '/api'
//创建axios实例
var instance = axios.create({
  //baseURL: process.env.NODE_ENV === 'development' ? '' : 'https://www.ihedui.com:10001',
  // baseURL: 'http://localhost:8888/api',
  timeout: 5000, //请求超过5秒即超时返回错误
  headers: {
    Accept: "application/json; charset=utf-8",
    'content-type': 'application/json',
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  },
});
//request拦截器
instance.interceptors.request.use(
 config => {
  //判断是否存在token，如果存在的话，则每个http header都加上token
  if (store.state.token) {
   //config.headers.Authorization = `token ${store.state.token}`;
   config.headers.token = store.state.token;
   config.headers.userId = store.state.userId;
  }
  return config;
 }
);
//respone拦截器
instance.interceptors.response.use(
 response => {
   return response;
 },
 error => { //默认除了2XX之外的都是错误的，就会走这里
  if (error.response) {
   switch (error.response.status) {
    case 401:
     router.replace({ //跳转到登录页面
      path: 'login',
      query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
     });
     localStorage.removeItem('iToken');
   }
  }
  return Promise.reject(error.response);
 }
);

export default {
  //用户注册
  userRegister(data){
    return instance.post(url + '/user/register', JSON.stringify(data));
  },
  //用户登录
  userLogin(data){
    return instance.post(url + '/user/login', data); 
  },
  //用户提交审核
  userCheck(data){
    return instance.post(url + '/user/check', data);
  },
  //用户是否存在
  userExist(data){
    return instance.get(url + '/user/userexist', {
      params: data
    });
  },
  //套餐列表
  packageShowall(data){
    return instance.get(url + '/package/showall', {
      params: data
    });
  },
  //修改密码
  resetPassword(data){
    return instance.post(url + '/user/resetpwd', data);
  },
  //用户权益
  userProbation(data){
    return instance.post(url + '/user/probation', data);
  },

  //
  /*
  data = {userId：token：type: dicts:}
  */
  confSetdic(data){
    return instance.post(url + '/conf/setdic', data);
  },
  //
  /*
  data = {userId：token：type: dicts:}
  */
  confDeldic(data){
    return instance.post(url + '/conf/deldic', data);
  },
  //
  /*
  data = {userId：token：type:}
  */
  confGetdic(data){
    return instance.post(url + '/conf/getdic', data);
  }
}