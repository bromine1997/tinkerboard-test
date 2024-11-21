import { Line } from "vue-chartjs";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "line-chart",
  components: {
    Line,
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    chartData: {
      type: Object,
      required: true,
    },
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
      chartRef: null,
    };
  },
  methods: {
    updateGradients() {
      if (!this.chartData) return;
      const chartInstance = this.chartRef?.chart;
      const ctx = chartInstance?.ctx;
      if (!ctx) return;

      const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(this.gradientStops[0], this.gradientColors[0]);
      gradientStroke.addColorStop(this.gradientStops[1], this.gradientColors[1]);
      gradientStroke.addColorStop(this.gradientStops[2], this.gradientColors[2]);

      this.chartData.datasets.forEach((set) => {
        set.backgroundColor = gradientStroke;
      });
    },
  },
  mounted() {
    this.updateGradients();
  },
  watch: {
    chartData: {
      handler() {
        this.updateGradients();
      },
      deep: true,
    },
  },
  render(createElement) {
    return createElement(Line, {
      ref: "chartRef",
      props: {
        chartId: this.chartId,
        chartData: this.chartData,
        options: this.extraOptions,
      },
    });
  },
};
