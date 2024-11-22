<template>
  <LineChart :chart-data="chartData" :options="chartOptions" />
</template>

<script>
import { defineComponent, ref, watch, onMounted } from 'vue';
import { Line, useChart } from 'vue-chartjs';
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
    LineChart: Line,
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
    const chartOptions = ref({ ...props.extraOptions });

    const updateGradients = (data, ctx) => {
      if (!data) return;
      const gradient = ctx.createLinearGradient(0, 230, 0, 50);
      props.gradientStops.forEach((stop, index) => {
        gradient.addColorStop(stop, props.gradientColors[index]);
      });
      data.datasets.forEach((dataset) => {
        dataset.backgroundColor = gradient;
      });
    };

    watch(
      () => props.chartData,
      (newVal, oldVal) => {
        if (newVal) {
          // 업데이트된 데이터에 그라디언트 적용
          updateGradients(newVal, null); // ctx는 자동으로 처리됨
        }
      },
      { immediate: true, deep: true }
    );

    onMounted(() => {
      // 초기 차트 렌더링 시 그라디언트 적용
      // 추가적인 로직이 필요할 경우 여기에 작성
    });

    return {
      chartOptions,
    };
  },
});
</script>

<style scoped>
/* 스타일이 필요하면 여기에 추가 */
</style>
