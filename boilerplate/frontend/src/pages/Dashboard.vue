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
            label: '실시간 PRESSURE',
            borderColor: 'blue',
            data: [
              { x: 0, y: 2 },
              { x: 1, y: 40 },
              { x: 2, y: 10 },
              { x: 6, y: 1.5 },
              { x: 8, y: 1.5 },
            ],
            fill: false,
          },
        ],
      },
      sensorData: {
        temperature: 25,
        humidity: 6,
        pressure: 101325,
        O2: 21,
        Co2: 0.04,
      },
      runTime: 0,
      timer: null,
      isRunning: false, // RUN 버튼의 상태
    };
  },
  computed: {
    // 최대/최소 값 계산
    chartOptions() {
      const allData = this.pressureChartData.datasets.flatMap(dataset => dataset.data);
      const xValues = allData.map(point => point.x);
      const yValues = allData.map(point => point.y);

      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time', // X축을 시간으로 설정
            time: {
              unit: 'second', // 초 단위 시간 설정
              tooltipFormat: 'HH:mm:ss',
            },
            title: {
              display: true,
              text: 'Time (seconds)',
              color: 'white',
            },
            ticks: {
              color: 'white',
              autoSkip: true,  // 레이블 자동 스킵 설정
              maxTicksLimit: 10,  // 최대 레이블 수 설정
            },
            grid: {
              display: true,
              color: '#4d4d4d',
            },
          },
          y: {
            beginAtZero: true,
            min: Math.min(...yValues) * 0.9,
            max: Math.max(...yValues) * 1.1,
            ticks: {
              color: 'white',
              stepSize: (Math.max(...yValues) - Math.min(...yValues)) / 5,
            },
            title: {
              display: true,
              text: 'Pressure (Pa)',
              color: 'white',
            },
            grid: {
              display: true,
              color: '#4d4d4d',
            },
          },
        },
      };
    },
    formattedRunTime() {
      const hours = Math.floor(this.runTime / 3600);
      const minutes = Math.floor((this.runTime % 3600) / 60);
      const seconds = this.runTime % 60;
      return `${hours}시간 ${minutes}분 ${seconds}초`;
    },
  },
  methods: {
    async fetchProfile() {
      try {
        const response = await axios.get('/profile/latest');
        const profileData = response.data;

        // 프로파일 데이터를 차트 데이터 형식으로 변환
        const chartData = this.convertProfileToChartData(profileData);

        // 차트 데이터 업데이트
        this.pressureChartData.datasets[0].data = chartData;

        // 차트 업데이트
        this.$refs.lineChart.renderChart();

        alert('프로파일을 성공적으로 가져왔습니다.');
      } catch (error) {
        console.error('프로파일 가져오기 실패:', error);
        alert('프로파일을 가져오는 데 실패했습니다.');
      }
  },

    convertProfileToChartData(profileData) {
      const sections = profileData.profileSections;
      const chartData = [];
      let currentTime = 0;

      for (const section of sections) {
        const { startPressure, endPressure, time } = section;

        // 시작점 추가
        chartData.push({ x: currentTime, y: startPressure });

        // 종료점 시간 계산
        currentTime += time * 60; // time이 분 단위라면 초 단위로 변환

        // 종료점 추가
        chartData.push({ x: currentTime, y: endPressure });
      }

      return chartData;
    },

    startChamber() {
      this.isRunning = true;
      this.$refs.lineChart.startDrawing();  // lineChart에 데이터 그리기 시작
      this.startTimer();  // 타이머 시작
      alert('챔버가 시작되었습니다.');
    },
    stopChamber() {
      this.isRunning = false;
      this.$refs.lineChart.stopDrawing();  // lineChart 그리기 중지
      this.stopTimer();  // 타이머 중지
      alert('챔버가 정지되었습니다.');
    },
    pauseChamber() {
      this.isRunning = false;
      this.stopTimer();  // 타이머 일시 정지
      alert('챔버가 일시정지되었습니다.');
    },
    startTimer() {
      if (!this.timer) {
        this.timer = setInterval(() => {
          this.runTime++;
        }, 1000);
      }
    },
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;  // 타이머 리셋
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
