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
          x: {
            type: 'time', // X축을 시간 축으로 설정
            time: {
              unit: 'second', // 시간 단위를 초 단위로 설정 (필요에 따라 'minute', 'hour' 등으로 변경 가능)
              tooltipFormat: 'HH:mm:ss', // 툴팁에 표시될 시간 형식
            },
            title: {
              display: true,
              text: 'Time (seconds)', // X축 레이블
            },
          },
          y: {
            min: 0,  // y축 최소값
            max: 5, // y축 최대값, 데이터 범위에 맞게 조정하세요
            title: {
              display: true,
              text: 'Pressure (Pa)', // Y축 레이블
            },
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
          const currentTime = new Date(); // 현재 시간을 가져옴
          this.$data._chart.data.datasets.forEach((dataset) => {
            dataset.data.push({
              x: currentTime, // X축에 시간을 설정
              y: this.chartData.datasets[0].data[this.chartDataIndex].y, // Y축에 압력 값을 설정
            });
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

