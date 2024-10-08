import Vue from 'vue';
import VueRouter from 'vue-router';
import RouterPrefetch from 'vue-router-prefetch';
import App from './App';
import router from './router/index';

import BlackDashboard from './plugins/blackDashboard';
import i18n from './i18n';
import './registerServiceWorker';

import axios from 'axios';

Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);

axios.defaults.baseURL = 'http://localhost:8080'; // 백엔드 서버 주소

// Vue 2에서 전역으로 axios 설정
Vue.prototype.$http = axios;

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
