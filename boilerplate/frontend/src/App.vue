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
  onBeforeUnmount,
  watch,
  getCurrentInstance,
} from '@vue/composition-api';
import { useRoute } from 'vue-router';

export default {
  setup(props, context) {
    const sensorDataStore = useSensorDataStore();
    const route = useRoute();

    // 전역 속성 접근
    const instance = getCurrentInstance();
    if (!instance) {
      throw new Error('Failed to get current instance');
    }
    const vueInstance = instance.proxy;

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

    // 워처는 setup 함수 내에서 바로 선언
    watch(
      () => route.fullPath,
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

    onBeforeUnmount(() => {
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
