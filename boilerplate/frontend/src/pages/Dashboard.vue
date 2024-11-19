<template>
  <div>
    <!-- 헤더 섹션: 대시보드 제목과 제어 버튼 -->
    <div class="row mb-4">
      <div class="col-12 d-flex justify-content-between align-items-center">
        <div>
          <h5 class="card-category">
            {{ $t("dashboard.totalShipments") }}
          </h5>
          <h2 class="card-title">{{ $t("dashboard.performance") }}</h2>
        </div>
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <button
            class="btn btn-sm btn-primary"
            @click="startMonitoring"
            :disabled="isMonitoring"
          >
            시작
          </button>
          <button
            class="btn btn-sm btn-secondary"
            @click="togglePauseResume"
            :disabled="!isMonitoring"
          >
            {{ isPaused ? 'Resume' : 'Pause' }}
          </button>
          <button
            class="btn btn-sm btn-danger"
            @click="stopMonitoring"
            :disabled="!isMonitoring"
          >
            정지
          </button>
        </div>
      </div>
    </div>

    <!-- 라인 차트 섹션 -->
    <div class="row mb-4">
      <div class="col-12">
        <card type="chart">
          <div class="chart-area">
            <line-chart
              ref="mainChart"
              chart-id="main-line-chart"
              :chart-data="mainChart.chartData"
              :gradient-colors="mainChart.gradientColors"
              :gradient-stops="mainChart.gradientStops"
              :extra-options="mainChart.extraOptions"
            />
          </div>
        </card>
      </div>
    </div>

    <!-- 모니터링 지표 섹션 -->
    <div class="row">
      <div
        class="col-lg-4 col-md-6 mb-4"
        v-for="(metric, index) in monitoringMetrics"
        :key="index"
      >
        <card type="info">
          <div class="card-body text-center">
            <i :class="metric.icon" class="tim-icons"></i>
            <h5 class="card-category">{{ metric.name }}</h5>
            <h3 class="card-title">{{ metric.value }} {{ metric.unit }}</h3>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from "@/components/Charts/LineChart";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      // 메인 라인 차트 데이터
      mainChart: {
        chartData: {
          labels: this.generateLabels(),
          datasets: [
            {
              label: "Sensor Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              pointBackgroundColor: config.colors.primary,
              data: [],
            },
          ],
        },
        extraOptions: chartConfigs.blueChartOptions,      //blue chart 옵션 이용
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
      },
      // 모니터링 지표
      monitoringMetrics: [
        { name: "산소 (Oxygen)", value: 0, unit: "%", icon: "tim-icons icon-oxygen" },
        { name: "이산화탄소 (Carbon Dioxide)", value: 0, unit: "ppm", icon: "tim-icons icon-carbon-dioxide" },
        { name: "온도 (Temperature)", value: 0, unit: "°C", icon: "tim-icons icon-temperature" },
        { name: "습도 (Humidity)", value: 0, unit: "%", icon: "tim-icons icon-humidity" },
        { name: "압력 (Pressure)", value: 0, unit: "hPa", icon: "tim-icons icon-pressure" },
        { name: "유량 (Flow)", value: 0, unit: "L/min", icon: "tim-icons icon-flow" },
      ],
      // 모니터링 상태
      isMonitoring: false,
      isPaused: false,
      monitoringInterval: null,
    };
  },
  computed: {
    isRTL() {
      return this.$rtl.isRTL;
    },
  },
  methods: {
    // 차트 레이블 생성 (예: 시간 간격)
    generateLabels() {
      const labels = [];
      const now = new Date();
      for (let i = 59; i >= 0; i--) { // 60초 간격으로 1분 분량
        const time = new Date(now.getTime() - i * 1000); // 매 초마다
        labels.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
      return labels;
    },
    // 모니터링 시작
    startMonitoring() {
      if (this.isMonitoring) return;
      this.isMonitoring = true;
      this.isPaused = false;
      this.monitoringInterval = setInterval(this.updateMetrics, 1000); // 1초마다 업데이트
      this.updateMetrics(); // 초기 업데이트
    },
    // 일시정지/재개 토글
    togglePauseResume() {
      if (!this.isMonitoring) return;
      this.isPaused = !this.isPaused;
      if (this.isPaused) {
        clearInterval(this.monitoringInterval);
      } else {
        this.monitoringInterval = setInterval(this.updateMetrics, 1000);
      }
    },
    // 모니터링 정지
    stopMonitoring() {
      if (!this.isMonitoring) return;
      clearInterval(this.monitoringInterval);
      this.isMonitoring = false;
      this.isPaused = false;
    },
    // 지표 데이터 업데이트
    updateMetrics() {
      // 새로운 데이터 포인트 가져오기 (실제 API 호출로 대체 필요)
      const newDataPoint = this.fetchSensorData();
      // 차트 데이터 업데이트
      const chart = this.mainChart.chartData;
     

      chart.labels.push(newDataPoint.time);
      chart.datasets[0].data.push(newDataPoint.value);
      this.mainChart.chartData = { ...chart };
      // 모니터링 지표 업데이트
      this.monitoringMetrics.forEach((metric, index) => {
        metric.value = newDataPoint.metrics[index];
      });
    },
    // 센서 데이터 가져오기 (시뮬레이션)
    fetchSensorData() {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const value = Math.floor(Math.random() * 5); // 0부터 5까지의 정수 값
      const metrics = [
        (Math.random() * 100).toFixed(2),   // 산소 %
        (Math.random() * 1000).toFixed(2),  // 이산화탄소 ppm
        (Math.random() * 40).toFixed(2),    // 온도 °C
        (Math.random() * 100).toFixed(2),   // 습도 %
        (Math.random() * 1000).toFixed(2),  // 압력 hPa
        (Math.random() * 500).toFixed(2),   // 유량 L/min
      ];
      return { time, value, metrics };
    },
  },
  mounted() {
    // 차트 초기화
    

    this.mainChart.chartData.labels =[];
    this.mainChart.chartData.datasets[0].data = [];

    // RTL 설정
    this.i18n = this.$i18n;
    if (this.$route.query.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }
  },
  beforeDestroy() {
    // 인터벌 정리
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
    // RTL 해제
    if (this.$rtl.isRTL) {
      this.i18n.locale = "en";
      this.$rtl.disableRTL();
    }
  },
};
</script>



<style scoped>
.card-category {
  font-size: 14px;
  color: #888;
}
.card-title {
  font-size: 24px;
  margin-top: 10px;
}
.card-body i {
  font-size: 30px;
  margin-bottom: 10px;
  color: #007bff;
}
.btn-group .btn {
  margin-left: 5px;
}
</style>