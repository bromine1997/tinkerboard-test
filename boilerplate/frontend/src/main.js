// main.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCompositionApi from '@vue/composition-api';
import RouterPrefetch from 'vue-router-prefetch';
import App from './App';
import router from './router/index';

import BlackDashboard from './plugins/blackDashboard';
import i18n from './i18n';
import './registerServiceWorker';

import axios from 'axios';
import socket from './socket'; // Socket.IO 클라이언트 임포트

import { createPinia, PiniaVuePlugin } from 'pinia';


Vue.use(VueCompositionApi);


Vue.use(PiniaVuePlugin); // Vue 2에서는 이 플러그인을 사용해야 합니다.
const pinia = createPinia();


Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);



axios.defaults.baseURL = 'http://localhost:8080' ; // 백엔드 서버 주소



// Vue 2에서 전역으로 axios 설정
Vue.prototype.$http = axios;
Vue.prototype.$socket = socket; // Socket.IO 클라이언트를 전역으로 설정



new Vue({
  router,
  pinia,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
