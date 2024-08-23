<template>
  <div>
    <div class="row">
      <div class="col-12 mb-4">
        <h2 class="text-center">IOT HBOT Chamber Monitoring System</h2>
      </div>

      <!-- 압력 Profile Line Chart -->
      <div class="col-12 mb-4">
        <card type="chart" class="chart-card large-chart-card">
          <div class="chart-header">
            <h4>PRESSURE PROFILE</h4>
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
            <h4>Sensor DATA MONITORING</h4>
          </div>
          <div class="sensor-data">
            <p>온도: {{ sensorData.temperature }} °C</p>
            <p>습도: {{ sensorData.humidity }} %</p>
            <p>압력: {{ sensorData.pressure }} Pa</p>
            <p>산소: {{ sensorData.O2 }} %</p>
            <p>이산화탄소: {{ sensorData.CO2 }} %</p>
          </div>
        </card>
      </div>

      <!-- 동작 시간 표시 -->
      <div class="col-12 mb-4">
        <card type="chart" class="chart-card">
          <div class="chart-header">
            <h4>동작 시간</h4>
          </div>
          <div class="timer-display">
            <p>{{ formattedRunTime }}</p>
          </div>
        </card>
      </div>

      <!-- 챔버 제어 버튼들 -->
      <div class="col-12 text-center">
        <button class="control-button large-control-button" @click="startChamber">RUN</button>
        <button class="control-button large-control-button" @click="stopChamber">STOP</button>
        <button class="control-button large-control-button" @click="pauseChamber">일시정지</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
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
        O2: 21,
        CO2: 0.04,
      },
      runTime: 0, // 초 단위로 동작 시간 저장
      timer: null,
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
  computed: {
    formattedRunTime() {
      const hours = Math.floor(this.runTime / 3600);
      const minutes = Math.floor((this.runTime % 3600) / 60);
      const seconds = this.runTime % 60;
      return `${hours}시간 ${minutes}분 ${seconds}초`;
    },
  },
  methods: {
    async fetchRunTime() {
      try {
        const response = await axios.get('/api/device/runtime');
        this.runTime = response.data.runTime; // 서버에서 초 단위로 시간을 받아옴
      } catch (error) {
        console.error("동작 시간 가져오기 실패:", error);
      }
    },
    async syncWithDevice(action) {
      try {
        const response = await axios.post('/api/device/control', { action });
        this.runTime = response.data.runTime; // 동작 후 서버에서 최신 동작 시간 받아옴
      } catch (error) {
        console.error(`${action} 명령을 수행하는 데 실패했습니다:`, error);
      }
    },
    startChamber() {
      this.syncWithDevice('run');
      this.startTimer();
      alert("챔버가 시작되었습니다.");
    },
    stopChamber() {
      this.syncWithDevice('stop');
      this.stopTimer();
      alert("챔버가 정지되었습니다.");
    },
    pauseChamber() {
      this.syncWithDevice('pause');
      this.stopTimer();
      alert("챔버가 일시정지되었습니다.");
    },
    startTimer() {
      this.fetchRunTime(); // 타이머 시작 전에 서버로부터 최신 동작 시간 가져오기
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
  mounted() {
    this.fetchRunTime(); // 컴포넌트가 마운트될 때 서버에서 동작 시간 가져오기
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

.chart-card {
  background-color: #1e1e2f;
  color: white;
  border-radius: 10px;
  padding: 20px;
}

.large-chart-card {
  height: 600px;
  width: 100%;
}

.chart-header {
  margin-bottom: 15px;
}

.sensor-data {
  font-size: 18px;
  line-height: 1.6;
}

.timer-display {
  font-size: 24px;
  text-align: center;
  margin-top: 10px;
}

.control-button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 30px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.control-button:hover {
  background-color: #45a049;
}
</style>
