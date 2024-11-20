<!-- Dashboard.vue -->
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
        <!-- 제어 버튼 (생략) -->
      </div>
    </div>

    <!-- 압력 데이터 라인 차트 -->
    <div class="row mb-4">
      <div class="col-12">
        <card type="chart">
          <div class="chart-area">
            <line-chart
              ref="pressureChart"
              chart-id="pressure-line-chart"
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
import LineChart from "@/components/Charts/LineChart";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";
import { useSensorDataStore } from "@/store/sensorData";
import { computed } from '@vue/composition-api'; // Vue 2에서 Composition API 사용

export default {
  components: {
    LineChart,
  },
  setup() {
    const sensorDataStore = useSensorDataStore();

    const mainChart = {
      extraOptions: chartConfigs.blueChartOptions,
      gradientColors: config.colors.primaryGradient,
      gradientStops: [1, 0.4, 0],
    };

    const monitoringMetrics = computed(() => {
      const newMetrics = sensorDataStore.metrics;
      return [
        { name: "산소 (Oxygen)", value: newMetrics.oxygen, unit: "%", icon: "tim-icons icon-oxygen" },
        { name: "이산화탄소 (Carbon Dioxide)", value: newMetrics.carbonDioxide, unit: "ppm", icon: "tim-icons icon-carbon-dioxide" },
        { name: "온도 (Temperature)", value: newMetrics.temperature, unit: "°C", icon: "tim-icons icon-temperature" },
        { name: "습도 (Humidity)", value: newMetrics.humidity, unit: "%", icon: "tim-icons icon-humidity" },
        { name: "유량 (Flow)", value: newMetrics.flow, unit: "L/min", icon: "tim-icons icon-flow" },
        { name: "압력 (Pressure)", value: newMetrics.pressure, unit: "ATA", icon: "tim-icons icon-flow" },
      ];
    });

    const pressureChartData = computed(() => {
      const labels = sensorDataStore.pressureData.map((data) => data.time);
      const dataPoints = sensorDataStore.pressureData.map((data) => data.value);
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
      sensorDataStore,
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
</style>
