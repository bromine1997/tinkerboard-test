import { Line, mixins } from "vue-chartjs";

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
      validator: (val) => {
        return val.length > 2;
      },
    },
    gradientStops: {
      type: Array,
      default: () => [1, 0.4, 0],
      validator: (val) => {
        return val.length > 2;
      },
    },
  },
  data() {
    return {
      ctx: null,
      updateInterval: null, // 타이머를 저장할 변수
      localData: [1.8, 1.6, 1.4, 1.2, 1.0, 1.3, 1.5, 1.7, 1.9], // 임의의 데이터
      currentIndex: 0, // 현재 데이터 인덱스
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
      // 현재 인덱스에 해당하는 데이터를 가져옴
      const newDataPoint = this.localData[this.currentIndex];
      
      // 데이터가 더 이상 없으면 타이머를 멈춤
      if (newDataPoint === undefined) {
        clearInterval(this.updateInterval);
        return;
      }

      // 차트 데이터에 새로운 데이터를 추가
      if (this.chartData && this.chartData.datasets) {
        this.chartData.datasets.forEach((dataset) => {
          dataset.data.push({ x: this.currentIndex, y: newDataPoint }); // 데이터셋에 새 데이터 추가
        });
      }

      this.updateGradients(this.chartData); // 그라데이션 업데이트
      this.$data._chart.update(); // 차트를 수동으로 업데이트

      // 다음 인덱스로 이동
      this.currentIndex++;
    },
    startDrawing() {
      // 1초마다 addDataPoint 메서드를 호출하여 데이터를 갱신
      if (!this.updateInterval) {
        this.updateInterval = setInterval(this.addDataPoint, 1000);
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
    this.$watch(
      "chartData",
      (newVal, oldVal) => {
        this.updateGradients(this.chartData);
        if (!oldVal) {
          this.renderChart(this.chartData, this.extraOptions);
        }
      },
      { immediate: true }
    );
  },
  beforeDestroy() {
    // 컴포넌트가 파괴될 때 타이머를 해제
    this.stopDrawing();
  }
};


