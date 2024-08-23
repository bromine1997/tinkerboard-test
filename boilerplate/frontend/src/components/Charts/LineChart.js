import { Line, mixins } from 'vue-chartjs';

export default {
  name: 'line-chart',
  extends: Line,
  mixins: [mixins.reactiveProp],
  data() {
    return {
      chartDataIndex: 0,
      intervalId: null,
    };
  },
  methods: {
    initializeChart() {
      // Chart.js 차트를 초기화
      this.renderChart(this.chartData, this.extraOptions);
    },
    startDrawing() {
      // 1초에 하나씩 데이터를 추가
      this.intervalId = setInterval(() => {
        if (this.chartDataIndex < this.chartData.datasets[0].data.length) {
          // 데이터를 하나씩 추가
          this.$data._chart.data.datasets.forEach((dataset) => {
            dataset.data.push(this.chartData.datasets[0].data[this.chartDataIndex]);
          });
          this.$data._chart.update();
          this.chartDataIndex += 1;
        } else {
          // 모든 데이터가 추가되면 반복 종료
          clearInterval(this.intervalId);
        }
      }, 1000);
    },
  },
  mounted() {
    this.initializeChart();
  },
};

