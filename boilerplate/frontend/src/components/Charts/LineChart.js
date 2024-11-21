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

      // Chart.js 데이터셋에서 동적으로 배경색 업데이트
      const updatedDatasets = props.chartData.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: createGradient(ctx),
      }));

      // Chart.js 인스턴스 제거 후 새로 생성
      if (chartInstance.value) {
        chartInstance.value.destroy();
      }
      chartInstance.value = new ChartJS(ctx, {
        type: "line",
        data: {
          ...props.chartData,
          datasets: updatedDatasets,
        },
        options: props.extraOptions,
      });
    };

    // Chart 데이터 감시 후 업데이트
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
