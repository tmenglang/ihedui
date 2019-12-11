import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Worker from '@/views/Worker.vue'
import About from '@/views/About.vue'
import Support from '@/views/Support.vue'
import Buy from '@/views/Buy.vue'
import Set from '@/views/Set.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Home from '@/views/Home.vue'
import NotFind from '@/views/404.vue'
Vue.use(Router)

const router = new Router({
    routes: [
      {path: '/', component: Home},
      {path: '/home', name:'home', component: Home},
      {path: '/worker', name:'worker', component: Worker},
      {path: '/about', name:'about', component: About},
      {path: '/support', name:'support', component: Support},
      {path: '/buy', name:'buy', component: Buy},
      {path: '/set', name:'set', component: Set},
      {path: '/login', name:'login', component: Login},
      {path: '/register', name:'register', component: Register},
      {path: '*', name: 'Notfind', component: NotFind},
    ],
    mode: 'history'
});
//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
 //获取store里面的token
 let token = store.state.token;
 //判断要去的路由有没有requiresAuth
 if (to.meta.requiresAuth) {
  if (token) {
   next();
  } else {
   next({
    path: '/login',
    query: { redirect: to.fullPath } // 将刚刚要去的路由path作为参数，方便登录成功后直接跳转到该路由
   });
  }
 } else {
  next(); 
 }
  // const isLogin = localStorage.iToken ? true : false;
  // if (to.path == '/login' && isLogin) {
  //   next('/');
  // }
});
export default router;