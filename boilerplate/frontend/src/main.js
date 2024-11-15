// main.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import RouterPrefetch from 'vue-router-prefetch';
import App from './App';
import router from './router/index';

import BlackDashboard from './plugins/blackDashboard';
import i18n from './i18n';
import './registerServiceWorker';

import axios from 'axios';
import socket from './socket'; // Socket.IO 클라이언트 임포트


Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);



axios.defaults.baseURL = 'http://localhost:8080' ; // 백엔드 서버 주소



// Vue 2에서 전역으로 axios 설정
Vue.prototype.$http = axios;
Vue.prototype.$socket = socket; // Socket.IO 클라이언트를 전역으로 설정


// JWT 토큰을 Axios 기본 헤더에 설정
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
