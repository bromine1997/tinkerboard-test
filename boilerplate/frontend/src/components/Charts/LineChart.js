import { Line, mixins } from 'vue-chartjs';

export default {
  name: 'line-chart',
  extends: Line,
  mixins: [mixins.reactiveProp],
  data() {
    return {
      chartDataIndex: 0,
      intervalId: null,
      chartOptions: {
        scales: {
          y: {
            min: 0,  // y축 최소값
            max: 5, // y축 최대값, 데이터 범위에 맞게 조정하세요
          },
        },
      },
    };
  },
  methods: {
    initializeChart() {
      this.renderChart(this.chartData, this.chartOptions);
    },
    startDrawing() {
      this.intervalId = setInterval(() => {
        if (this.chartDataIndex < this.chartData.datasets[0].data.length) {
          this.$data._chart.data.datasets.forEach((dataset) => {
            dataset.data.push(this.chartData.datasets[0].data[this.chartDataIndex]);
          });
          this.$data._chart.update();
          this.chartDataIndex += 1;
        } else {
          clearInterval(this.intervalId);
        }
      }, 1000);
    },
  },
  mounted() {
    this.initializeChart();
  },
};

