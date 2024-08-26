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
            <button class="fetch-button" @click="fetchProfile">Fetch Profile from DB</button>
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
            <p>압력: {{ sensorData.pressure }} Pa</p>
            <p>산소: {{ sensorData.O2 }} %</p>
            <p>이산화탄소: {{ sensorData.Co2 }} Pa</p>
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
        <button class="control-button large-control-button" @click="startChamber">RUN</button>
        <button class="control-button large-control-button" @click="pauseChamber">일시정지</button>
        <button class="control-button large-control-button" @click="stopChamber">STOP</button>
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
            label: 'SET PROFILE ',
            borderColor: 'red',
            data: [
              { x: 0, y: 1.5 },
              { x: 5, y: 1.5 },
              { x: 10, y: 1.6 },
              { x: 15, y: 1.5 },
              { x: 20, y: 1.5 },
            ],
            fill: false,
          },
          {
            label: '실시간 PRESSURE',
            borderColor: 'blue',
            data: [
              { x: 0, y: 2 },
              { x: 1, y: 1.8 },
              { x: 2, y: 1.5 },
              { x: 3, y: 1.2 },
              { x: 4, y: 1.0 },
            ],
            fill: false,
          },
        ],
      },
      sensorData: {
        temperature: 25,
        humidity: 60,
        pressure: 101325,
        O2: 21,
        Co2: 0.04,
      },
      runTime: 0,
      timer: null,
      dataIndex: 0,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'Time (seconds)',
              color: 'white',
            },
            min: 0,
            max: 5, // Start with initial view range
            ticks: {
              color: 'white',
            },
          },
          y: {
            beginAtZero: true,
            min: 1.0,
            max: 2.5,
            ticks: {
              stepSize: 0.5,
              color: 'white',
            },
            title: {
              display: true,
              text: 'Pressure (Pa)',
              color: 'white',
            },
          },
        },
      },
    };
  },
  computed: {
    formattedRunTime() {
      const hours = Math.floor(this.runTime / 3600);
      const minutes = Math.floor((this.runTime % 3600) / 60);
      const seconds = this.runTime % 60;
      return `${hours}시간 ${minutes}분 ${seconds}초`;
    },
  },
  methods: {
    fetchProfile() {
      alert('Fetching profile from the database...');
    },
    startChamber() {
      this.$refs.lineChart.startDrawing(); // Start adding data points to chart
      this.startTimer();
      alert('챔버가 시작되었습니다.');
    },
    stopChamber() {
      this.$refs.lineChart.stopDrawing();
      this.stopTimer();
      alert('챔버가 정지되었습니다.');
    },
    pauseChamber() {
      this.stopTimer();
      alert('챔버가 일시정지되었습니다.');
    },
    startTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.runTime++;
      }, 1000);
    },
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
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
  min-height: 300px; /* 동일한 높이 설정 */
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

