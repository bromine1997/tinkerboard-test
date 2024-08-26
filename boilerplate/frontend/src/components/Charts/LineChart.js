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
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'linear', // X축 타입을 linear로 변경
            title: {
              display: true,
              text: 'Time (seconds)',
              color: 'white', // X축 레이블 색상 설정
            },
            min: 0, // X축 최소값 초기 설정
            max: 40, // X축 최대값 초기 설정
            ticks: {
              color: 'white', // X축 눈금 텍스트 색상 설정
            },
          },
          y: {
            beginAtZero: true,
            suggestedMin: 1.0, // y축 최소값을 1.0으로 초기 설정
            suggestedMax: 2.5, // y축 최대값을 2.5로 초기 설정
            title: {
              display: true,
              text: 'Pressure (Pa)',
              color: 'white', // Y축 레이블 색상 설정
            },
            ticks: {
              color: 'white', // Y축 눈금 텍스트 색상 설정
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
          const currentTime = this.chartDataIndex; // 기존 코드의 new Date()에서 초 단위 값으로 변경
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

