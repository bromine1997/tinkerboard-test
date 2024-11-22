<!-- src/components/Charts/LineChart.vue -->
<template>
  <Line ref="chartRef" :data="chartData" :options="chartOptions" />
</template>

<script>
import { defineComponent, ref, watch, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from 'chart.js';

// Chart.js 컴포넌트 등록
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

export default defineComponent({
  name: 'LineChart',
  components: {
    Line,
  },
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
    const chartOptions = ref({ ...props.extraOptions });

    const updateGradients = (chart) => {
      if (!chart) return;
      const ctx = chart.ctx;
      const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      props.gradientStops.forEach((stop, index) => {
        gradientStroke.addColorStop(stop, props.gradientColors[index]);
      });

      chart.data.datasets.forEach((dataset) => {
        dataset.backgroundColor = gradientStroke;
      });

      chart.update();
    };

    watch(
      () => props.chartData,
      (newData) => {
        if (newData && chartRef.value) {
          updateGradients(chartRef.value);
        }
      },
      { deep: true, immediate: true }
    );

    onMounted(() => {
      if (chartRef.value) {
        updateGradients(chartRef.value);
      }
    });

    return {
      chartRef,
      chartOptions,
    };
  },
});
</script>

<style scoped>
/* 스타일이 필요하면 여기에 추가 */
</style>
