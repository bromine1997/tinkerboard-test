<template>
  <div>
    <notifications></notifications>
    <router-view
      v-if="route && route.fullPath"
      :key="route.fullPath"
      @new-sensor-data="handleNewSensorData"
    ></router-view>
  </div>
</template>

<script>
import { computed,onMounted, onBeforeUnmount, watch, inject } from 'vue';
import { useRoute } from 'vue-router';
import { useSocketStore } from '@/store/socketStore';

export default {
  setup() {
    const route = useRoute();
    
    // Pinia 스토어 초기화
    const socketStore = useSocketStore();
    
    // 스토어에서 상태 직접 참조
    const connected = computed(() => socketStore.connected);
    const error = computed(() => socketStore.error);
    
    const sidebarStore = inject('sidebarStore');
    const rtlStore = inject('rtlStore');

    const disableRTL = () => {
      if (rtlStore && !rtlStore.isRTL) {
        rtlStore.disableRTL();
      }
    };

    const toggleNavOpen = () => {
      const root = document.documentElement;
      root.classList.toggle('nav-open');
    };

    watch(
      () => route?.fullPath,
      () => {
        disableRTL();
      },
      { immediate: true }
    );

    watch(
      () => sidebarStore?.showSidebar,
      () => {
        toggleNavOpen();
      }
    );

    onMounted(() => {
      console.log('소켓 연결 상태:', connected.value);
      if (error.value) {
        console.error('소켓 연결 에러:', error.value);
      }
    });

    onBeforeUnmount(() => {
      if (socketStore.socket) {
        socketStore.socket.disconnect();
      }
    });

    return {
      route,
      connected,
      error
    };
  },
};
</script>