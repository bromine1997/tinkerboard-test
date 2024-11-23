<template>
  <div>
    <!-- 헤더 섹션 -->
    <div class="row mb-4">
      <div class="col-12 d-flex justify-content-between align-items-center">
        <div>
          <h5 class="card-category">HBOT CHAMBER MONITORING</h5>
          <h2 class="card-title">Performance Monitoring</h2>
        </div>
        <div class="d-flex align-items-center">
          <div class="setpoint-display mr-3">
            <strong>Set Point:</strong> {{ sensorData.metrics.setPoint }}
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
    </div>

    <!-- 라인 차트 섹션 -->
    <div class="row mb-4">
      <div class="col-12">
        <card type="chart">
          <div class="chart-area">
            <line-chart
              ref="mainChart"
              chart-id="main-line-chart"
              :chart-data="chartData"
              :gradient-colors="gradientColors"
              :gradient-stops="[1, 0.5, 0]"
            />
          </div>
        </card>
      </div>
    </div>

    <!-- 모니터링 지표 섹션 -->
    <div class="row">
      <div
        class="col-lg-4 col-md-6 mb-4"
        v-for="(value, key) in sensorData.metrics"
        :key="key"
      >
        <card type="info">
          <div class="card-body text-center">
            <h5 class="card-category">{{ key }}</h5>
            <h3 class="card-title">{{ value }}</h3>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useSensorDataStore } from "@/stores/sensorData"; // Pinia 스토어
import LineChart from "@/components/Charts/LineChart.vue";

export default {
  components: {
    LineChart,
  },
  setup() {
    const sensorData = useSensorDataStore(); // 스토어 사용
    const isMonitoring = ref(false);
    const isPaused = ref(false);
    const gradientColors = ["rgba(72,72,176,0.2)", "rgba(72,72,176,0.0)", "rgba(119,52,169,0)"];

    const chartData = reactive({
      labels: [],
      datasets: [
        {
          label: "Random Data",
          data: [],
        },
      ],
    });

    let intervalId = null;

    const generateRandomData = () => {
      const newValue = Math.random() * 5; // 0~5 사이의 랜덤 값
      const currentTime = new Date().toLocaleTimeString();
      chartData.labels.push(currentTime);
      chartData.datasets[0].data.push(newValue);

      // 데이터 개수가 20개를 초과하면 오래된 데이터 제거
      if (chartData.labels.length > 20) {
        chartData.labels.shift();
        chartData.datasets[0].data.shift();
      }
    };

    const startMonitoring = () => {
      isMonitoring.value = true;
      isPaused.value = false;
      intervalId = setInterval(() => {
        if (!isPaused.value) {
          generateRandomData();
        }
      }, 1000); // 1초마다 데이터 생성
    };

    const togglePauseResume = () => {
      isPaused.value = !isPaused.value;
    };

    const stopMonitoring = () => {
      isMonitoring.value = false;
      isPaused.value = false;
      clearInterval(intervalId);
      intervalId = null;
    };

    return {
      sensorData, // Pinia 데이터 노출
      isMonitoring,
      isPaused,
      chartData,
      gradientColors,
      startMonitoring,
      togglePauseResume,
      stopMonitoring,
    };
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
.setpoint-display {
  font-size: 16px;
  color: #000;
}
.btn-group .btn {
  margin-left: 5px;
}
</style>
