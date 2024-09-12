import { Line, mixins } from "vue-chartjs";
import "chartjs-adapter-moment"; // moment.js 어댑터 사용

export default {
  name: "line-chart",
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    extraOptions: Object,
    gradientColors: {
      type: Array,
      default: () => [
        "rgba(72,72,176,0.2)",
        "rgba(72,72,176,0.0)",
        "rgba(119,52,169,0)",
      ],
      validator: (val) => val.length > 2,
    },
    gradientStops: {
      type: Array,
      default: () => [1, 0.4, 0],
      validator: (val) => val.length > 2,
    },
  },
  data() {
    return {
      ctx: null,
      updateInterval: null,
      localData: [1.8, 1.6, 1.4, 1.2, 1.0, 1.3, 1.5, 1.7, 1.9], // 임의 데이터
      currentIndex: 0,
      currentTime: Date.now(), // 현재 시간 기반으로 시작
    };
  },
  methods: {
    updateGradients(chartData) {
      if (!chartData) return;
      const ctx = this.ctx || document.getElementById(this.chartId).getContext("2d");
      const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(this.gradientStops[0], this.gradientColors[0]);
      gradientStroke.addColorStop(this.gradientStops[1], this.gradientColors[1]);
      gradientStroke.addColorStop(this.gradientStops[2], this.gradientColors[2]);
      chartData.datasets.forEach((set) => {
        set.backgroundColor = gradientStroke;
      });
    },
    addDataPoint() {
      const newDataPoint = this.localData[this.currentIndex];
      
      if (newDataPoint === undefined) {
        clearInterval(this.updateInterval);
        return;
      }

      // 현재 시간을 기준으로 X값을 시간으로 설정
      const currentTimestamp = new Date(this.currentTime + this.currentIndex * 1000); // 1초 간격

      // 차트에 데이터 추가
      if (this.chartData && this.chartData.datasets) {
        this.chartData.datasets.forEach((dataset) => {
          dataset.data.push({ x: currentTimestamp, y: newDataPoint });
        });
      }

      this.updateGradients(this.chartData);
      this.$data._chart.update(); // 차트 업데이트

      // 인덱스를 다음으로 증가
      this.currentIndex++;
    },
    startDrawing() {
      if (!this.updateInterval) {
        this.updateInterval = setInterval(this.addDataPoint, 1000); // 1초마다 데이터 추가
      }
    },
    stopDrawing() {
      if (this.updateInterval) {
        clearInterval(this.updateInterval);
        this.updateInterval = null;
      }
    }
  },
  mounted() {
    this.ctx = this.$refs.lineChart ? this.$refs.lineChart.getContext("2d") : null;

    this.$watch(
      "chartData",
      (newVal, oldVal) => {
        this.updateGradients(this.chartData);
        if (!oldVal) {
          this.renderChart(this.chartData, this.extraOptions || this.defaultChartOptions());
        }
      },
      { immediate: true }
    );
  },
  beforeDestroy() {
    this.stopDrawing(); // 컴포넌트가 파괴될 때 타이머 해제
  },
  methods: {
    defaultChartOptions() {
      return {
        scales: {
          x: {
            type: 'time', // X축을 시간으로 설정
            time: {
              unit: 'second', // 초 단위로 설정
            },
            title: {
              display: true,
              text: 'Time (seconds)',
              color: 'white',
            },
            ticks: {
              color: 'white',
              stepSize: 1, // 스텝 크기 설정
            },
            grid: {
              display: true,
              color: '#4d4d4d',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Pressure (Pa)',
              color: 'white',
            },
            ticks: {
              color: 'white',
              stepSize: 0.5,
            },
            grid: {
              display: true,
              color: '#4d4d4d',
            },
          },
        },
      };
    }
  }
};
