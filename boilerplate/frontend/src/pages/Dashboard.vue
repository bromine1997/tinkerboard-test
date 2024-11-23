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
            <v-chart
              :option="mainChartOptions"
              
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
            <h3 class="card-title">{{ metric.value }} {{ metric.unit }}</h3>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import * as chartConfigs from "@/components/Charts/config";
import { useSensorDataStore } from "@/store/sensorData";

export default {
  setup() {

    const sensorDataStore = useSensorDataStore();


    const isMonitoring = ref(false); // 모니터링 상태
    const isPaused = ref(false); // 일시 정지 상태

    const setPoint = computed(() => sensorDataStore.metrics.setPoint);

    const xAxisData = Array.from({ length: 201 }, (_, i) => i);


    // 라인 차트 데이터 관리
    const chartData = ref({
      time: [],
      value: [],
    });

    // ECharts 옵션 계산된 속성
    const mainChartOptions = computed(() => ({
      ...chartConfigs.blueChartOptions,
      xAxis: {
        ...chartConfigs.blueChartOptions.xAxis,
        data: xAxisData, // 시계열 데이터 시간
      },
      series: [
        {
          ...chartConfigs.blueChartOptions.series[0],
          data: chartData.value.value, // 랜덤 데이터 값
        },
      ],
    }));

    // 모니터링 지표 계산된 속성 (필요에 따라 수정 가능)
    const monitoringMetrics = computed(() => {
      const metrics = [
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
          value: sensorDataStore.metrics.flow,
          unit: "L/min",
        },
        {
          name: "압력 (Pressure)",
          value: sensorDataStore.metrics.pressure,
          unit: "ATA",
        },
      ];
      
      console.log('Updated monitoringMetrics:', metrics); // 디버깅용 로그
      return metrics;
    });


    const generateRandomData = () => {
      const newValue = parseFloat((Math.random() * 5).toFixed(2)); // 0~5 사이의 랜덤 값
      chartData.value.value.push(newValue); // 객체의 value 배열에 데이터 추가
      console.log('Generated new data:', newValue);
    };
    let intervalId = null;

    // 메소드: 모니터링 시작
    const startMonitoring = () => {
      if (isMonitoring.value) return; // 이미 모니터링 중이면 무시
      isMonitoring.value = true;
      isPaused.value = false;
      intervalId = setInterval(() => {
        if (!isPaused.value) {
          generateRandomData();
        }
      }, 1000); // 1초마다 데이터 생성
    };

    // 메소드: 일시 정지/재개 토글
    const togglePauseResume = () => {
      isPaused.value = !isPaused.value;
    };

    // 메소드: 모니터링 정지
    const stopMonitoring = () => {
      isMonitoring.value = false;
      isPaused.value = false;
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    // 컴포넌트 언마운트 시 인터벌 정리
    onUnmounted(() => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    });

    return {
      setPoint,
      mainChartOptions,
      monitoringMetrics,
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
.chart-area {
  max-height: 450px; /* 최대 높이 설정 (필요 시 변경 가능) */
}

</style>
