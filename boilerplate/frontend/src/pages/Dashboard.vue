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
      <div class="col-lg-4 col-md-6 mb-4" v-for="(metric, index) in monitoringMetrics" :key="index">
        <div class="info-card">
          <div class="card-body text-center">
            <h5 class="card-category">{{ metric.name }}</h5>
            <h3 class="card-title">{{ metric.value }} {{ metric.unit }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watch } from 'vue'; // Vue Composition API 사용
import LineChart from "@/components/Charts/LineChart";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";
import { useSensorDataStore } from "@/store/sensorData";

export default {
  components: {
    LineChart,
  },
  setup() {
    const sensorDataStore = useSensorDataStore();

    // 샘플링 간격 설정 (60번째 데이터 간격으로 표시)
    const SAMPLE_INTERVAL = 60;

    // 데이터 샘플링 함수
    const getSampledData = (data) => {
      return data.filter((_, index) => index % SAMPLE_INTERVAL === 0);
    };

    // Computed properties
    const setPoint = computed(() => sensorDataStore.metrics.setPoint);

    const mainChart = computed(() => ({
      extraOptions: chartConfigs.blueChartOptions,
      gradientColors: config.colors.primaryGradient,
      gradientStops: [1, 0.4, 0],
    }));

    const monitoringMetrics = computed(() => {
      return [
        {
          name: "산소 (Oxygen)",
          value: sensorDataStore.metrics.oxygen,
          unit: "%",
        },
        {
          name: "이산화탄소 (Carbon Dioxide)",
          value: sensorDataStore.metrics.carbonDioxide,
          unit: "ppm",
        },
        {
          name: "온도 (Temperature)",
          value: sensorDataStore.metrics.temperature,
          unit: "°C",
        },
        {
          name: "습도 (Humidity)",
          value: sensorDataStore.metrics.humidity,
          unit: "%",
        },
        {
          name: "유량 (Flow)",
          value: sensorDataStore.metrics.flowRate,
          unit: "L/min",
        },
        {
          name: "압력 (Pressure)",
          value: sensorDataStore.metrics.pressure,
          unit: "ATA",
        },
      ];
    });

    const pressureChartData = computed(() => {
      // 샘플링된 데이터 가져오기
      const sampledData = getSampledData(sensorDataStore.pressureData);

      // 샘플링된 데이터를 기반으로 차트 데이터 생성
      const labels = sampledData.map((data) => data.time);
      const dataPoints = sampledData.map((data) => data.value);

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

    return {
      setPoint,
      mainChart,
      monitoringMetrics,
      pressureChartData,
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
