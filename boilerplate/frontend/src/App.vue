<template>
  <div>
    <notifications></notifications>
    <router-view :key="$route.fullPath" @new-sensor-data="handleNewSensorData"></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    disableRTL() {
      if (!this.$rtl.isRTL) {
        this.$rtl.disableRTL();
      }
    },
    toggleNavOpen() {
      let root = document.getElementsByTagName('html')[0];
      root.classList.toggle('nav-open');
    },
    handleNewSensorData(data) {
      // 웹소켓을 통해 수신한 센서 데이터를 각 페이지에 전달
      console.log("새 센서 데이터 수신:", data);
      this.$emit("new-sensor-data", data);
    },
  },
  mounted() {
    this.$watch('$route', this.disableRTL, { immediate: true });
    this.$watch('$sidebar.showSidebar', this.toggleNavOpen);

    // 웹소켓 연결 설정
    this.$socket.on("connect", () => {
      console.log("웹 WebSocket 연결 성공");
    });

    this.$socket.on("disconnect", () => {
      console.log("웹 WebSocket 연결 해제");
    });

    // 센서 데이터 수신 이벤트
    this.$socket.on("sensor_data_update", (data) => {
      this.handleNewSensorData(data); // 각 페이지에 데이터 전송
    });
  },
  beforeDestroy() {
    // 컴포넌트가 파괴되기 전 이벤트 해제
    this.$socket.off("sensor_data_update", this.handleNewSensorData);
  }
};
</script>

<style lang="scss"></style>
