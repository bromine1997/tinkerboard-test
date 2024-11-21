import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { defineComponent, onMounted, ref, watch } from "vue";

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
    },
    gradientStops: {
      type: Array,
      default: () => [1, 0.4, 0],
    },
  },
  setup(props) {
    const canvas = ref(null);
    const chartInstance = ref(null);

    // Chart.js 플러그인 등록
    ChartJS.register(
      Title,
      Tooltip,
      Legend,
      LineElement,
      CategoryScale,
      LinearScale,
      PointElement
    );

    const createGradient = (ctx) => {
      const gradient = ctx.createLinearGradient(0, 230, 0, 50);
      gradient.addColorStop(props.gradientStops[0], props.gradientColors[0]);
      gradient.addColorStop(props.gradientStops[1], props.gradientColors[1]);
      gradient.addColorStop(props.gradientStops[2], props.gradientColors[2]);
      return gradient;
    };

    const renderChart = () => {
      const ctx = canvas.value.getContext("2d");

      // Update dataset background gradient
      props.chartData.datasets.forEach((dataset) => {
        dataset.backgroundColor = createGradient(ctx);
      });

      // Destroy previous chart instance if it exists
      if (chartInstance.value) {
        chartInstance.value.destroy();
      }

      // Create new chart instance
      chartInstance.value = new ChartJS(ctx, {
        type: "line",
        data: props.chartData,
        options: props.extraOptions,
      });
    };

    // Watch for changes in chartData and re-render
    watch(
      () => props.chartData,
      () => {
        renderChart();
      },
      { deep: true }
    );

    onMounted(() => {
      renderChart();
    });

    return {
      canvas,
    };
  },
});