<template>
  <div>
    <div class="row">
      <div class="col-12 mb-4">
        <h2 class="text-center">IoT 장비 모니터링 및 제어</h2>
      </div>

      <!-- 압력 프로필 Line Chart -->
      <div class="col-12 mb-4">
        <card type="chart" class="chart-card">
          <div class="chart-header">
            <h4>압력 프로필</h4>
          </div>
          <div class="chart-area">
            <line-chart
              ref="lineChart"
              :chart-data="pressureChartData"
              :extra-options="chartOptions"
            />
          </div>
        </card>
      </div>

      <!-- 센서 데이터 모니터링 -->
      <div class="col-12 mb-4">
        <card type="chart" class="chart-card">
          <div class="chart-header">
            <h4>센서 데이터 모니터링</h4>
          </div>
          <div class="sensor-data">
            <p>온도: {{ sensorData.temperature }} °C</p>
            <p>습도: {{ sensorData.humidity }} %</p>
            <p>압력: {{ sensorData.pressure }} Pa</p>
          </div>
        </card>
      </div>

      <!-- 챔버 제어 버튼들 -->
      <div class="col-12 text-center">
        <button class="control-button" @click="startChamber">RUN</button>
        <button class="control-button" @click="stopChamber">STOP</button>
        <button class="control-button" @click="pauseChamber">일시정지</button>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/Charts/LineChart';

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      pressureChartData: {
        datasets: [
          {
            label: '압력 프로필',
            borderColor: 'blue',
            data: [
              { x: 0, y: 1 },
              { x: 1, y: 0.5 },
              { x: 2, y: 1.5 },
              { x: 3, y: 0.8 },
              { x: 4, y: 1.2 },
            ],
          },
        ],
      },
      sensorData: {
        temperature: 25,
        humidity: 60,
        pressure: 101325,
      },
      chartOptions: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    };
  },
  methods: {
    startChamber() {
      // 챔버 시작 로직
      alert("챔버가 시작되었습니다.");
    },
    stopChamber() {
      // 챔버 정지 로직
      alert("챔버가 정지되었습니다.");
    },
    pauseChamber() {
      // 챔버 일시정지 로직
      alert("챔버가 일시정지되었습니다.");
    },
  },
};
</script>

<style scoped>
.row {
  margin-top: 20px;
}

.chart-card {
  background-color: #1e1e2f;
  color: white;
  border-radius: 10px;
  padding: 20px;
}

.chart-header {
  margin-bottom: 15px;
}

.sensor-data {
  font-size: 18px;
  line-height: 1.6;
}

.control-button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.control-button:hover {
  background-color: #45a049;
}
</style>
