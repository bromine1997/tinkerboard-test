<template>
  <div>
    <div class="row">
      <div class="col-12 mb-4">
        <h2 class="text-center main-title">IoT HBOT CHAMBER MONITORING</h2>
      </div>

      <!-- Pressure Profile Line Chart -->
      <div class="col-12 mb-4">
        <card type="chart" class="chart-card large-chart-card">
          <div class="chart-header">
            <h4>Pressure Profile</h4>
            <button class="fetch-button" @click="fetchProfile">프로파일 불러오기</button>
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

      <!-- Sensor Data Monitoring -->
      <div class="col-6 mb-4">
        <card type="chart" class="chart-card equal-height-card">
          <div class="chart-header">
            <h4>센서 데이터 모니터링</h4>
          </div>
          <div class="sensor-data">
            <p>온도: {{ sensorData.temperature }} °C</p>
            <p>습도: {{ sensorData.humidity }} %</p>
            <p>압력: {{ sensorData.pressure.toLocaleString() }} Pa</p>
            <p>산소: {{ sensorData.O2 }} %</p>
            <p>이산화탄소: {{ sensorData.Co2 }} %</p>
          </div>
        </card>
      </div>

      <!-- Run Time Display -->
      <div class="col-6 mb-4">
        <card type="chart" class="chart-card equal-height-card">
          <div class="chart-header">
            <h4>동작 시간</h4>
          </div>
          <div class="timer-display">
            <p>{{ formattedRunTime }}</p>
          </div>
        </card>
      </div>

      <!-- Chamber Control Buttons -->
      <div class="col-12 text-center">
        <button class="control-button large-control-button" :disabled="isRunning" @click="startChamber">
          <span v-if="!isRunning">RUN</span>
          <span v-else>Running...</span>
        </button>
        <button class="control-button large-control-button" @click="pauseChamber">일시정지</button>
        <button class="control-button large-control-button" @click="stopChamber">STOP</button>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/Charts/LineChart";
import { EventBus } from "@/eventBus"; // EventBus를 import

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      pressureChartData: {
        datasets: [
          {
            label: "SET PROFILE",
            borderColor: "red",
            tension: 0,
            data: [
              { x: 0, y: 2 },
              { x: 2, y: 40 },
              { x: 4, y: 40 },
              { x: 6, y: 1.5 },
              { x: 8, y: 1.5 },
            ],
            fill: false,
          },
          {
            label: "실시간 PRESSURE",
            borderColor: "blue",
            data: [],
            fill: false,
          },
        ],
      },
      sensorData: {
        temperature: 0,
        humidity: 0,
        pressure: 0,
        O2: 0,
        Co2: 0,
      },
      runTime: 0,
      timer: null,
      isRunning: false,
    };
  },
  mounted() {
    // EventBus를 통해 WebSocket 데이터 수신
    EventBus.$on("new-sensor-data", this.updateSensorData);
  },
  methods: {
    updateSensorData(data) {
      // 수신된 센서 데이터를 반영
      this.sensorData = {
        temperature: data.sensorData.temperature,
        humidity: data.sensorData.humidity,
        pressure: data.sensorData.pressure,
        O2: data.sensorData.oxygen,
        Co2: data.sensorData.co2,
      };
      this.updateChart(data.sensorData.pressure); // 차트 업데이트
    },
    updateChart(pressureValue) {
      const currentTime = new Date();
      const pressureData = { x: currentTime, y: pressureValue };

      this.pressureChartData.datasets[1].data.push(pressureData); // 실시간 데이터 추가
      this.$refs.lineChart.$data._chart.update(); // 차트 업데이트
    },
  },
  beforeDestroy() {
    // 컴포넌트가 파괴될 때 이벤트 해제
    EventBus.$off("new-sensor-data", this.updateSensorData);
  },
};
</script>
<style scoped>
.row {
  margin-top: 20px;
}
.main-title {
  font-family: 'Roboto', sans-serif;
  font-size: 2.5rem;
  color: #f7f7f7;
  letter-spacing: 1px;
  margin-bottom: 20px;
}
.chart-card {
  background-color: #2a2a3b;
  color: #ffffff;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}
.chart-card:hover {
  transform: translateY(-10px);
}
.large-chart-card {
  height: 700px; /* Increased size */
  width: 100%;
}
.equal-height-card {
  min-height: 410px; /* 동일한 높이 설정 */
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.chart-header {
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 1.5rem;
  color: #ff6f61;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.fetch-button {
  background-color: #ff5722;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.fetch-button:hover {
  background-color: #e64a19;
}
.sensor-data {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-top: 20px;
  color: #e0e0e0;
}
.timer-display {
  font-size: 2rem;
  text-align: center;
  margin-top: 20px;
  color: #ffeb3b;
}
.control-button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 12px 25px;
  margin: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}
.large-control-button {
  padding: 15px 35px;
  font-size: 1.2rem;
}
.control-button:hover {
  background-color: #0056b3;
  transform: translateY(-5px);
}
.control-button:active {
  background-color: #004494;
  transform: translateY(0);
}
</style>
