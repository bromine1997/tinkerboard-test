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
            type: 'linear',
            title: {
              display: true,
              text: 'Time (seconds)',
              color: 'white',
            },
            ticks: {
              color: 'white', // X축 눈금 텍스트 색상 설정
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
      this.renderChart(this.chartData, this.chartOptions);
    },
    startDrawing() {
      this.intervalId = setInterval(() => {
        if (this.chartDataIndex < this.chartData.datasets[1].data.length) {
          const newDataPoint = this.chartData.datasets[1].data[this.chartDataIndex];
          this.$data._chart.data.datasets[1].data.push(newDataPoint); // Add new data point to blue line

          // Automatically adjust x-axis max value
          this.$data._chart.options.scales.x.max = newDataPoint.x + 5;
          
          this.$data._chart.update(); // Update the chart
          this.chartDataIndex += 1;
        } else {
          clearInterval(this.intervalId); // Stop if all data points are added
        }
      }, 1000);
    },
  },
  mounted() {
    this.initializeChart();
  },
};

