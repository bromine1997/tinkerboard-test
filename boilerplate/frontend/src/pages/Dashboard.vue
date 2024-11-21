<template>
  <div>
    <!-- 헤더 섹션 -->
    <div class="row mb-4">
      <div class="col-12 d-flex justify-content-between align-items-center">
        <div>
          <h5 class="card-category"> "HBOT CHAMBER MONITORING" 
          </h5>
          <h2 class="card-title">Performance Monitoring</h2>
        </div>
        <div class="d-flex align-items-center">
          <!-- Set Point 표시 -->
          <div class="setpoint-display mr-3">
            <strong>Set Point:</strong> {{ setPoint }}
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
              :chart-data="pressureChartData"
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
            <h5 class="card-category">{{ metric.name }}</h5>
            <h3 class="card-title">{{ metric.value }} </h3>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import LineChart from "@/components/Charts/LineChart";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";
import { useSensorDataStore } from "@/store/sensorData";

export default {
  components: {
    LineChart,
  },
  setup() {
    // 상태 관리
    const sensorDataStore = useSensorDataStore();

    const isMonitoring = ref(false); // 모니터링 상태
    const isPaused = ref(false); // 일시 정지 상태

    // Computed properties
    const setPoint = computed(() => sensorDataStore.metrics.setPoint);

    const mainChart = computed(() => ({
      extraOptions: chartConfigs.blueChartOptions,
      gradientColors: config.colors.primaryGradient,
      gradientStops: [1, 0.4, 0],
    }));

    const monitoringMetrics = computed(() => {
      const newMetrics = sensorDataStore.metrics;
      console.log('Monitoring Metrics:', newMetrics); // 디버깅을 위해 로그 추가

      return [
        {
          name: "산소 (Oxygen)",
          value: newMetrics.oxygen,
          unit: "%",
        },
        {
          name: "이산화탄소 (Carbon Dioxide)",
          value: newMetrics.carbonDioxide,
          unit: "ppm",
        },
        {
          name: "온도 (Temperature)",
          value: newMetrics.temperature,
          unit: "°C",
        },
        {
          name: "습도 (Humidity)",
          value: newMetrics.humidity,
          unit: "%",
        },
        {
          name: "유량 (Flow)",
          value: newMetrics.flow,
          unit: "L/min",
        },
        {
          name: "압력 (Pressure)",
          value: newMetrics.pressure,
          unit: "ATA",
        },
      ];
    });

    const pressureChartData = computed(() => {
      const labels = sensorDataStore.pressureData.map(
        (data) => data.time
      );
      const dataPoints = sensorDataStore.pressureData.map(
        (data) => data.value
      );

      return {
        labels,
        datasets: [
          {
            label: "Pressure Data",
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            pointBackgroundColor: config.colors.primary,
            data: dataPoints,
          },
        ],
      };
    });

    // Methods
    const startMonitoring = () => {
      isMonitoring.value = true;
      isPaused.value = false;
      console.log('Monitoring started');
    };

    const togglePauseResume = () => {
      isPaused.value = !isPaused.value;
      console.log(isPaused.value ? 'Monitoring paused' : 'Monitoring resumed');
    };

    const stopMonitoring = () => {
      isMonitoring.value = false;
      isPaused.value = false;
      console.log('Monitoring stopped');
    };

    return {
      setPoint,
      mainChart,
      monitoringMetrics,
      pressureChartData,
      isMonitoring,
      isPaused,
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
.card-body i {
  font-size: 30px;
  margin-bottom: 10px;
  color: #007bff;
}
.btn-group .btn {
  margin-left: 5px;
}
.setpoint-display {
  font-size: 16px;
  color: #FFF;
}
</style>
