<template>
  <div>
    <div class="row">
      <div class="col-12 mb-4">
        <h2 class="text-center">IoT HBOT CHAMBER MONITORING</h2>
      </div>

      <!-- 압력 Profile Line Chart -->
      <div class="col-12 mb-4">
        <card type="chart" class="chart-card large-chart-card">
          <div class="chart-header">
            <h4>Pressure Profile</h4>
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
            <p>산소: {{ sensorData.O2 }} %</p>
            <p>이산화탄소: {{ sensorData.Co2 }} Pa</p>
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
            label: '압력 PROFILE',
            borderColor: 'blue',
            data: [],
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
      predefinedData: [
        { x: 0, y: 2 },
        { x: 1, y: 1.8 },
        { x: 2, y: 1.5 },
        { x: 3, y: 1.2 },
        { x: 4, y: 1.0 },
      ], // 미리 정의된 데이터 배열
      runTime: 0, // 초 단위로 동작 시간 저장
      timer: null,
      dataIndex: 0, // 데이터를 하나씩 추가할 때 사용할 인덱스
      chartOptions: {
        responsive: false, // 반응형을 비활성화하여 크기에 따라 스케일이 변하지 않도록 함
        maintainAspectRatio: false, // 종횡비 유지 비활성화
        scales: {
          x: {
            type: 'linear', // X축을 선형 축으로 설정
            title: {
              display: true,
              text: 'Time (seconds)', // X축 레이블
              color: 'white',
            },
          },
          y: {
            beginAtZero: true,
            min: 0, // Y축의 최소값을 0으로 설정
            max: 2.5, // Y축의 최대값을 2.5로 설정하여 데이터가 잘리지 않도록 함
            ticks: {
              stepSize: 0.5, // Y축 스케일을 0.5 단위로 설정
            },
            title: {
              display: true,
              text: 'Pressure (Pa)', // Y축 레이블
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
    startChamber() {
      // 챔버 시작 로직
      this.dataIndex = 0; // 데이터 인덱스를 초기화
      this.startTimer();
      this.addDataStepByStep();
      alert('챔버가 시작되었습니다.');
    },
    stopChamber() {
      // 챔버 정지 로직
      this.stopTimer();
      alert('챔버가 정지되었습니다.');
    },
    pauseChamber() {
      // 챔버 일시정지 로직
      this.stopTimer();
      alert('챔버가 일시정지되었습니다.');
    },
    startTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.runTime++;
      }, 1000); // 1초마다 runTime을 1씩 증가시킴
    },
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    addDataStepByStep() {
      this.timer = setInterval(() => {
        if (this.dataIndex < this.predefinedData.length) {
          const newDataPoint = this.predefinedData[this.dataIndex];
          this.pressureChartData.datasets[0].data.push(newDataPoint);
          this.$refs.lineChart.update(); // 차트를 업데이트
          this.dataIndex++;
        } else {
          clearInterval(this.timer); // 모든 데이터를 추가했으면 타이머를 멈춤
        }
      }, 1000); // 1초마다 데이터 포인트를 하나씩 추가
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
  height: 500px; /* 차트 카드의 고정된 높이 설정 */
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
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
}
.large-control-button {
  padding: 15px 30px;
  font-size: 16px;
}
.control-button:hover {
  background-color: #45a049;
}
</style>

