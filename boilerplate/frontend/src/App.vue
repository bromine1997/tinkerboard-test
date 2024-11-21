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
import { onMounted, onBeforeUnmount, getCurrentInstance, watch } from '@vue/composition-api';


export default {
  setup() {
    const sensorDataStore = useSensorDataStore();
    const vueInstance = getCurrentInstance().proxy;

    const disableRTL = () => {
      if (!vueInstance.$rtl.isRTL) {
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

    onMounted(() => {
      // WebSocket 이벤트 리스너 등록
      vueInstance.$socket.on('connect', handleConnect);
      vueInstance.$socket.on('disconnect', handleDisconnect);
      vueInstance.$socket.on('sensor_data_update', handleSensorDataUpdate);

      // 워처 설정
      watch(
        () => vueInstance.$route,
        () => {
          disableRTL();
        },
        { immediate: true }
      );

      watch(
        () => vueInstance.$sidebar.showSidebar,
        () => {
          toggleNavOpen();
        }
      );
    });

    onBeforeUnmount(() => {
      vueInstance.$socket.off('sensor_data_update', handleSensorDataUpdate);
    });

    return {
      handleNewSensorData,
    };
  },
};
</script>
