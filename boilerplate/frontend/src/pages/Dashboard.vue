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
            <button class="fetch-button" @click="fetchProfileFromDatabase">Fetch Profile from DB</button>
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
            label: 'SET PROFILE',
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
            max: 5,
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
      isLoading: false,
      hasError: false,
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
    fetchProfileFromDatabase() {
      this.isLoading = true;
      this.hasError = false;
      // DB에서 데이터를 가져오는 로직 추가
      setTimeout(() => {
        this.isLoading = false;
        // 성공적으로 데이터를 가져온 경우
        // this.pressureChartData.datasets[0].data = fetchedData;
        alert('Profile fetched from the database!');
      }, 1000);
    },
    startChamber() {
      this.$refs.lineChart.startDrawing(); // 실시간 데이터 추가 시작
      this.startTimer();
      alert('챔버가 시작되었습니다.');
    },
    stopChamber() {
      this.$refs.lineChart.stopDrawing(); // 실시간 데이터 추가 중지
      this.stopTimer();
      alert('챔버가 정지되었습니다.');
    },
    pauseChamber() {
      this.$refs.lineChart.stopDrawing(); // 실시간 데이터 추가 중지
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
        this.timer = null;
      }
    },
  },
  beforeDestroy() {
    this.stopChamber(); // 컴포넌트가 파괴될 때 챔버를 중지
  },
};
</script>

<style scoped>
/* 기존 스타일 유지하며, 버튼 애니메이션 효과 추가 */
.control-button:active {
  background-color: #004494;
  transform: translateY(0);
  transition: transform 0.1s ease-out; /* 클릭시 짧은 트랜지션 */
}
</style>

