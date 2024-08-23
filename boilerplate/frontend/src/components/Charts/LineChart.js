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
        responsive: true, // 반응형 설정 (필요시 false로 설정)
        maintainAspectRatio: false, // 반응형일 때 종횡비 유지 여부
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'second', 
              tooltipFormat: 'HH:mm:ss',
            },
            title: {
              display: true,
              text: 'Time (seconds)',
            },
            // X축의 최소/최대 값을 데이터 범위에 맞게 설정
            min: null,
            max: null,
          },
          y: {
            beginAtZero: true, // y축이 0에서 시작
            suggestedMin: null, // y축의 최소값을 자동 설정
            suggestedMax: null, // y축의 최대값을 자동 설정
            title: {
              display: true,
              text: 'Pressure (Pa)',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
    };
  },
  methods: {
    initializeChart() {
      // 데이터의 범위를 계산하여 Y축과 X축의 스케일을 동적으로 설정
      const xValues = this.chartData.datasets.flatMap(dataset => dataset.data.map(point => point.x));
      const yValues = this.chartData.datasets.flatMap(dataset => dataset.data.map(point => point.y));

      this.chartOptions.scales.x.min = Math.min(...xValues);
      this.chartOptions.scales.x.max = Math.max(...xValues);

      this.chartOptions.scales.y.suggestedMin = Math.min(...yValues);
      this.chartOptions.scales.y.suggestedMax = Math.max(...yValues);

      this.renderChart(this.chartData, this.chartOptions);
    },
    startDrawing() {
      this.intervalId = setInterval(() => {
        if (this.chartDataIndex < this.chartData.datasets[0].data.length) {
          const currentTime = new Date(); 
          this.$data._chart.data.datasets.forEach((dataset) => {
            dataset.data.push({
              x: currentTime,
              y: this.chartData.datasets[0].data[this.chartDataIndex].y,
            });
          });
          this.$data._chart.update();
          this.chartDataIndex += 1;

          // 데이터가 추가되면서 Y축의 범위를 다시 계산하여 업데이트
          const newYValues = this.$data._chart.data.datasets.flatMap(dataset => dataset.data.map(point => point.y));
          this.$data._chart.options.scales.y.suggestedMin = Math.min(...newYValues);
          this.$data._chart.options.scales.y.suggestedMax = Math.max(...newYValues);
          this.$data._chart.update();

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

