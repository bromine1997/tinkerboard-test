<template>
  <div>
    <notifications></notifications>
    <router-view
      :key="$route.fullPath"
      @new-sensor-data="handleNewSensorData"
    ></router-view>
  </div>
</template>

<script>
import { useSensorDataStore } from '@/store/sensorData';
import {
  onMounted,
  onUnmounted,
  getCurrentInstance,
  watch,
} from '@vue/composition-api';

export default {
  setup() {
    const sensorDataStore = useSensorDataStore();
    const vueInstance = getCurrentInstance();

    if (!vueInstance) {
      throw new Error('getCurrentInstance()가 null을 반환했습니다. @vue/composition-api가 올바르게 설치되고 등록되었는지 확인하세요.');
    }

    const disableRTL = () => {
      if (vueInstance.$rtl && !vueInstance.$rtl.isRTL) {
        vueInstance.$rtl.disableRTL();
      }
    };

    const toggleNavOpen = () => {
      let root = document.getElementsByTagName('html')[0];
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
      console.log('진짜 테스트 데이터:', data);
      sensorDataStore.updateSensorData(data);
    };

    // 워처 설정
    watch(
      () => vueInstance.$route && vueInstance.$route.fullPath,
      () => {
        disableRTL();
      },
      { immediate: true }
    );

    watch(
      () => vueInstance.$sidebar && vueInstance.$sidebar.showSidebar,
      () => {
        toggleNavOpen();
      }
    );

    onMounted(() => {
      // WebSocket 이벤트 리스너 등록
      if (vueInstance.$socket) {
        vueInstance.$socket.on('connect', handleConnect);
        vueInstance.$socket.on('disconnect', handleDisconnect);
        vueInstance.$socket.on('sensor_data_update', handleSensorDataUpdate);
      }
    });

    onUnmounted(() => {
      if (vueInstance.$socket) {
        vueInstance.$socket.off('sensor_data_update', handleSensorDataUpdate);
      }
    });

    return {
      handleNewSensorData,
    };
  },
};
</script>
