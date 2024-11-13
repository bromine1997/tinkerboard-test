<template>
  <div>
    <notifications></notifications>
    <router-view :key="$route.fullPath" @new-sensor-data="handleNewSensorData"></router-view>
  </div>
</template>



<script>

import { EventBus } from "@/eventBus"; // EventBus를 import

export default {
  methods: {
    disableRTL() {
      if (!this.$rtl.isRTL) {
        this.$rtl.disableRTL();
      }
    },
    toggleNavOpen() {
      let root = document.getElementsByTagName("html")[0];
      root.classList.toggle("nav-open");
    },
    handleNewSensorData(data) {
      // WebSocket을 통해 수신한 센서 데이터를 EventBus로 전송
      console.log("새 센서 데이터 수신:", data);
      EventBus.$emit("new-sensor-data", data);
    },
  },
  mounted() {
    this.$watch("$route", this.disableRTL, { immediate: true });
    this.$watch("$sidebar.showSidebar", this.toggleNavOpen);

    // WebSocket 연결 설정
    this.$socket.on("connect", () => {
      console.log("웹 WebSocket 연결 성공");
    });

    this.$socket.on("disconnect", () => {
      console.log("웹 WebSocket 연결 해제");
    });

    // 센서 데이터 수신 이벤트
    this.$socket.on("sensor_data_update", (data) => {
      this.handleNewSensorData(data); // EventBus로 데이터 전송
    });
  },
  beforeDestroy() {
    this.$socket.off("sensor_data_update", this.handleNewSensorData);
  },
};
</script>


<style lang="scss"></style>
