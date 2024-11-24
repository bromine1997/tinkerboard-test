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
import { onMounted, onBeforeUnmount, watch ,inject} from 'vue';
import { useRoute } from 'vue-router';
import { useSocketStore } from '@/store/socketStore'; // 새로 추가된 소켓 스토어

export default {
  setup() {
    const route = useRoute(); // Vue Router의 useRoute로 경로 정보 가져오기
    const sensorDataStore = useSensorDataStore();
    const socketStore = useSocketStore(); // 소켓 스토어 사용

    const { connected, error, emitCommand } = socketStore;

    // Sidebar 상태 및 RTL 상태 관리는 스토어에 따라 다를 수 있습니다.
    // 만약 기존에 sidebarStore, rtlStore를 사용하는 다른 스토어가 있다면 유지하거나 해당 스토어로 통합할 수 있습니다.
    // 여기서는 기존 코드를 그대로 유지합니다.
    const sidebarStore = inject('sidebarStore'); // Sidebar 상태 관리
    const rtlStore = inject('rtlStore'); // RTL 상태 관리

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

    const handleSensorDataUpdate = (data) => {
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
      // 소켓 이벤트는 스토어에서 이미 처리하고 있으므로 추가할 필요 없음
      // 단, 필요한 경우 스토어의 연결 상태를 확인할 수 있습니다.
      console.log('소켓 연결 상태:', connected.value);
      if (error.value) {
        console.error('소켓 연결 에러:', error.value);
      }
    });

    onBeforeUnmount(() => {
      // 소켓 스토어에서 필요한 정리 작업이 있다면 수행
      // 예: socketStore.disconnect(); 등
    });

    return {
      route, // route를 반환
      handleNewSensorData,
    };
  },
};
</script>
