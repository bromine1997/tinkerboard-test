import { Line, mixins } from 'vue-chartjs';

export default {
  name: 'line-chart',
  extends: Line,
  mixins: [mixins.reactiveProp],
  data() {
    return {
      // 임의의 데이터셋을 설정합니다.
      data1: [
        { x: 0, y: 10 },
        { x: 1, y: 20 },
        { x: 2, y: 30 },
        { x: 3, y: 40 },
        { x: 4, y: 50 },
      ],
      data2: [
        { x: 0, y: 15 },
        { x: 1, y: 25 },
        { x: 2, y: 35 },
        { x: 3, y: 45 },
        { x: 4, y: 55 },
      ],
      totalDuration: 5000,  // 임의의 총 지속시간
      chartConfig: {
        type: 'line',
        data: {
          datasets: [
            {
              borderColor: 'red',
              borderWidth: 1,
              radius: 0,
              data: [],  // 나중에 초기화될 데이터
            },
            {
              borderColor: 'blue',
              borderWidth: 1,
              radius: 0,
              data: [],  // 나중에 초기화될 데이터
            }
          ]
        },
        options: {
          animation: {
            x: {
              type: 'number',
              easing: 'linear',
              duration: this.delayBetweenPoints,
              from: NaN,
              delay(ctx) {
                if (ctx.type !== 'data' || ctx.xStarted) {
                  return 0;
                }
                ctx.xStarted = true;
                return ctx.index * this.delayBetweenPoints;
              }
            },
            y: {
              type: 'number',
              easing: 'linear',
              duration: this.delayBetweenPoints,
              from: this.previousY,
              delay(ctx) {
                if (ctx.type !== 'data' || ctx.yStarted) {
                  return 0;
                }
                ctx.yStarted = true;
                return ctx.index * this.delayBetweenPoints;
              }
            }
          },
          interaction: {
            intersect: false
          },
          plugins: {
            legend: false
          },
          scales: {
            x: {
              type: 'linear'
            }
          }
        }
      }
    };
  },
  computed: {
    delayBetweenPoints() {
      return this.totalDuration / this.data1.length;
    },
    previousY() {
      return (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    }
  },
  methods: {
    initializeChart() {
      // 데이터셋을 임의의 데이터로 초기화합니다.
      this.chartConfig.data.datasets[0].data = this.data1;
      this.chartConfig.data.datasets[1].data = this.data2;

      // 차트를 렌더링합니다.
      this.renderChart(this.chartConfig.data, this.chartConfig.options);
    }
  },
  mounted() {
    this.initializeChart(); // 컴포넌트가 마운트될 때 차트를 초기화합니다.
  }
};
