<template>
  <div>
    <!-- 헤더 섹션 -->
    <div class="row mb-4">
      <div class="col-12 d-flex justify-content-between align-items-center">
        <div>
          <h5 class="card-category">
            {{ $t("dashboard.totalShipments") }}
          </h5>
          <h2 class="card-title">{{ $t("dashboard.performance") }}</h2>
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
// Vue 2.7에서는 Composition API를 사용하기 위해 '@vue/composition-api'를 설치해야 합니다.
// 하지만 현재 Options API를 사용하고 있으므로, 스토어를 컴포넌트의 `data`나 `created` 훅에서 초기화합니다.

import LineChart from "@/components/Charts/LineChart";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";
import { useSensorDataStore } from "@/store/sensorData";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      isMonitoring: false,
      isPaused: false,
      pressureInterval: null,
      sensorDataStore: null, // 스토어를 여기서 정의
    };
  },
  computed: {
    setPoint() {
      return this.sensorDataStore.metrics.setPoint;
    },
    mainChart() {
      return {
        extraOptions: chartConfigs.blueChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
      };
    },
    monitoringMetrics() {
      const newMetrics = this.sensorDataStore.metrics;
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
    },
    pressureChartData() {
      const labels = this.sensorDataStore.pressureData.map(
        (data) => data.time
      );
      const dataPoints = this.sensorDataStore.pressureData.map(
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
    },
  },
  methods: {
    startMonitoring() {
      // 모니터링 시작 로직
      this.isMonitoring = true;
      this.isPaused = false;
      // 예시로, 서버에서 데이터를 주기적으로 받아오는 로직을 추가해야 합니다.
    },
    stopMonitoring() {
      // 모니터링 정지 로직
      this.isMonitoring = false;
      this.isPaused = false;
      // 데이터 수신을 중단하는 로직을 추가해야 합니다.
    },
    togglePauseResume() {
      // 모니터링 일시정지/재개 로직
      this.isPaused = !this.isPaused;
      // 일시정지 또는 재개에 따른 로직을 추가해야 합니다.
    },
  },
  created() {
    // 스토어를 초기화합니다.
    this.sensorDataStore = useSensorDataStore();
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
