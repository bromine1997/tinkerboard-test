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
            <p>산소: {{ sensorData.O2 }} Pa</p>
            <p>이산화탄소: {{ sensorData.CO2 }} Pa</p>
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
    syncWithDevice(action) {
      // 이 함수에서 장비와의 통신을 통해 동작 명령을 전달하고, 장비의 현재 상태를 동기화
      // 예를 들어, REST API 호출이나 WebSocket 메시지를 통해 수행할 수 있음.
      // axios.post('/api/device/control', { action })
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
