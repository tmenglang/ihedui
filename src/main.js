import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from './axios'
import router from './router'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
  
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/iconfont.css';

Vue.config.productionTip = false
Vue.prototype.$axios = axios
//Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.use(VueQuillEditor, {
  placeholder: '请输入内容',
  theme: 'bubble'
})



new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
