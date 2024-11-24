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
import { useSensorDataStore } from '@/store/sensorData';
import { onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute } from 'vue-router';
import { inject } from 'vue';


export default {
  setup() {
    
    const route = useRoute(); // Vue Router의 useRoute로 경로 정보 가져오기
    const sensorDataStore = useSensorDataStore();
    const sidebarStore = inject('sidebarStore'); // Sidebar 상태 관리
    const rtlStore = inject('rtlStore'); // RTL 상태 관리
    const socket = inject('socket'); // WebSocket 객체

    

    const disableRTL = () => {
      if (rtlStore && !rtlStore.isRTL) {
        rtlStore.disableRTL();
      }
    };

    const toggleNavOpen = () => {
      const root = document.documentElement; // HTML 엘리먼트 가져오기
      root.classList.toggle('nav-open');
    };


    const handleNewSensorData = (data) => {
      console.log('새 센서 데이터 수신:', data);
    };

    const handleConnect = () => {
      console.log('웹 WebSocket 연결 성공');
    };

    const handleDisconnect = () => {
      console.log('웹 WebSocket 연결 해제');
    };

    const handleSensorDataUpdate = (data) => {
      //console.log('진짜 테스트 데이터:', data);
      sensorDataStore.updateSensorData(data);
    };

    // 경로 변경 감지
    watch(
      () => route?.fullPath,
      () => {
        disableRTL();
      },
      { immediate: true }
    );

    // Sidebar 상태 변경 감지
    watch(
      () => sidebarStore?.showSidebar,
      () => {
        toggleNavOpen();
      }
    );

    onMounted(() => {
      // WebSocket 이벤트 리스너 등록
      if (socket) {
        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        socket.on('sensor_data_update', handleSensorDataUpdate);
      }
    });

    onBeforeUnmount(() => {
      if (socket) {
        socket.off('sensor_data_update', handleSensorDataUpdate);
      }
    });

    return {
      route, // route를 반환
      handleNewSensorData,
    };
  },
};
</script>
