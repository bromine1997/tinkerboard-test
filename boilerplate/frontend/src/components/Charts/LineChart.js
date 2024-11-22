import { Line } from 'vue-chartjs';
import { defineComponent, ref, watch } from 'vue';
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

export default defineComponent({
  name: 'line-chart',
  components: { Line },
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
        'rgba(72,72,176,0.2)',
        'rgba(72,72,176,0.0)',
        'rgba(119,52,169,0)',
      ],
      validator: (val) => val.length > 2,
    },
    gradientStops: {
      type: Array,
      default: () => [1, 0.4, 0],
      validator: (val) => val.length > 2,
    },
  },
  setup(props) {
    const chartRef = ref(null);

    const updateGradients = () => {
      if (!props.chartData) return;

      const chart = chartRef.value?.chart;
      if (!chart) return;

      const context = chart.ctx;

      const gradientStroke = context.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(props.gradientStops[0], props.gradientColors[0]);
      gradientStroke.addColorStop(props.gradientStops[1], props.gradientColors[1]);
      gradientStroke.addColorStop(props.gradientStops[2], props.gradientColors[2]);

      chart.data.datasets.forEach((set) => {
        set.backgroundColor = gradientStroke;
      });

      chart.update();
    };

    watch(
      () => props.chartData,
      () => {
        updateGradients();
      },
      { immediate: true }
    );

    return {
      chartRef,
      updateGradients,
    };
  },
  render() {
    return (
      <Line
        ref="chartRef"
        data={this.chartData}
        options={this.extraOptions}
      />
    );
  },
});
