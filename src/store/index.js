//store index.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
//初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录
const state = {
  token: localStorage.getItem('iToken') || '',
  userName: localStorage.getItem('userName') || '',
  userId: localStorage.getItem('userId') || '',
  mobile: localStorage.getItem('mobile') || '',
  currentPackageId: localStorage.getItem('currentPackageId') || '',
};
const mutations = {
  LOGIN: (state, data) => {
    //更改token的值
    state.token = data.token;
    state.userName = data.username;
    state.userId = data.userId;
    state.mobile = data.mobile;
    localStorage.setItem('iToken', data.token);
    localStorage.setItem('userName', data.username);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('mobile', data.mobile);
  },
  USERPROBATION: (state, data) => {
    state.currentPackageId = data.currentPackageId;
    localStorage.setItem('currentPackageId', data.currentPackageId);
  },
  LOGOUT: (state) => {
    //登出的时候要清除token
    state.token = null;
    state.userName = null;
    state.userId = null;
    state.mobile = null;
    state.currentPackageId = null;
    window.localStorage.removeItem('iToken');
    window.localStorage.removeItem('userName');
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('mobile');
    window.localStorage.removeItem('currentPackageId');
  }
};

const actions = {
  UserLogin({ commit }, data){
    commit('LOGIN', data);
  },
  UserLogout({ commit }){
    commit('LOGOUT');
  },
  UserProbation({ commit }, data){
    commit('USERPROBATION', data);
  }
};
export default new Vuex.Store({
  state,
  mutations,
  actions
});