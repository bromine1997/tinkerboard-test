<template>
  <div>
    <notifications></notifications>
    <!-- route 객체가 null인지 확인 후 렌더링 -->
    <router-view
      v-if="route && route.fullPath"
      :key="route.fullPath"
      @new-sensor-data="handleNewSensorData"
    ></router-view>
  </div>
</template>

<script>
import { useWebSocketStore } from '@/stores/websocket';
import { onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute } from 'vue-router';
import { inject } from 'vue';

export default {
  setup() {
    const route = useRoute(); // Vue Router의 useRoute로 경로 정보 가져오기
    const websocketStore = useWebSocketStore();
    const sidebarStore = inject('sidebarStore'); // Sidebar 상태 관리
    const rtlStore = inject('rtlStore'); // RTL 상태 관리

    // RTL 상태 비활성화 함수
    const disableRTL = () => {
      if (rtlStore && !rtlStore.isRTL) {
        rtlStore.disableRTL();
      }
    };

    // 사이드바 토글 함수
    const toggleNavOpen = () => {
      const root = document.documentElement; // HTML 엘리먼트 가져오기
      root.classList.toggle('nav-open');
    };

    // 새로운 센서 데이터 핸들러
    const handleNewSensorData = (data) => {
      console.log('새 센서 데이터 수신:', data);
      // 필요 시 추가 로직 구현
    };

    // 경로 변경 감지 및 RTL 비활성화
    watch(
      () => route?.fullPath,
      () => {
        disableRTL();
      },
      { immediate: true }
    );

    // 사이드바 상태 변경 감지 및 네비게이션 토글
    watch(
      () => sidebarStore?.showSidebar,
      () => {
        toggleNavOpen();
      }
    );

    onMounted(() => {
      // WebSocket 초기화는 스토어에서 처리
      websocketStore.initWebSocket();
    });

    onBeforeUnmount(() => {
      // WebSocket 종료는 스토어에서 처리
      websocketStore.disconnectWebSocket();
    });

    return {
      route, // route를 반환
      handleNewSensorData,
      sendCommand: websocketStore.sendCommand, // 스토어의 sendCommand 메서드 노출
    };
  },
};
</script>
