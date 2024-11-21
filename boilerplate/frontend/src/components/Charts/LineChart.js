
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { defineComponent, ref, watch, onMounted } from "vue";

export default defineComponent({
  name: "LineChart",
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    extraOptions: {
      type: Object,
      default: () => ({}),
    },
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
    chartId: {
      type: String,
      default: "line-chart",
    },
  },
  setup(props) {
    const chartCanvas = ref(null); // Canvas reference
    let chartInstance = null; // Chart.js instance

    const createGradient = (ctx) => {
      const gradient = ctx.createLinearGradient(0, 230, 0, 50);
      gradient.addColorStop(props.gradientStops[0], props.gradientColors[0]);
      gradient.addColorStop(props.gradientStops[1], props.gradientColors[1]);
      gradient.addColorStop(props.gradientStops[2], props.gradientColors[2]);
      return gradient;
    };

    const updateGradients = (chartData) => {
      if (!chartData) return;
      const ctx = chartCanvas.value.getContext("2d");
      const gradient = createGradient(ctx);
      chartData.datasets.forEach((set) => {
        set.backgroundColor = gradient;
      });
    };

    const renderChart = () => {
      if (chartInstance) {
        chartInstance.destroy(); // 기존 차트 삭제
      }

      const ctx = chartCanvas.value.getContext("2d");
      updateGradients(props.chartData);

      chartInstance = new ChartJS(ctx, {
        type: "line",
        data: props.chartData,
        options: props.extraOptions,
      });
    };

    // Watch for chartData changes
    watch(
      () => props.chartData,
      (newData) => {
        updateGradients(newData);
        renderChart();
      },
      { deep: true }
    );

    // Initial rendering
    onMounted(() => {
      renderChart();
    });

    return {
      chartCanvas,
    };
  },
});


