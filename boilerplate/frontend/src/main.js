import { createApp } from 'vue'; // Vue 3의 앱 생성 API
import App from './App.vue';
import router from './router/index'; // Vue Router 4
import { createPinia } from 'pinia'; // Pinia 생성
import i18n from './i18n'; // Vue I18n 9
import axios from 'axios';
import socket from './socket'; // Socket.IO 클라이언트 import
import BlackDashboard from './plugins/blackDashboard'; // 커스텀 플러그인
import './registerServiceWorker'; // PWA 등록

// ECharts 및 vue-echarts 관련 임포트
import VueECharts from 'vue-echarts';
import { use } from 'echarts/core';

// ECharts의 필요한 모듈 임포트 (트리 쉐이킹 최적화)
import {
  CanvasRenderer
} from 'echarts/renderers';
import {
  LineChart,
  BarChart
} from 'echarts/charts';
import {
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  LegendComponent
} from 'echarts/components';

// 필요한 ECharts 컴포넌트 등록
use([
  CanvasRenderer,
  LineChart,
  BarChart,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  LegendComponent,
]);

// Axios 기본 URL 설정
axios.defaults.baseURL = 'http://localhost:8080'; // 백엔드 서버 주소

// Vue 3 앱 생성
const app = createApp(App);

// vue-echarts 컴포넌트를 전역으로 등록
app.component('v-chart', VueECharts);

// Pinia 사용
const pinia = createPinia();
app.use(pinia);

// Vue Router 사용
app.use(router);

// Vue I18n 사용
app.use(i18n);

// BlackDashboard 플러그인 사용
app.use(BlackDashboard);

// RTL 초기화
app.config.globalProperties.$rtl.disableRTL(); // RTL 비활성화

// 글로벌 속성 설정
app.config.globalProperties.$http = axios; // Axios를 글로벌로 설정


// Vue 앱 마운트
app.mount('#app');
