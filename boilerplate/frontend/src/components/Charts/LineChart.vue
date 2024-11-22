<!-- src/components/Charts/LineChart.vue -->
<template>
  <Line :id="chartId" ref="chartRef" :data="chartData" :options="chartOptions" />
</template>

<script>
import { defineComponent, ref, watch, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import ChartJS from 'chart.js/auto'; // chart.js/auto를 사용하여 자동 등록

export default defineComponent({
  name: 'LineChart',
  components: {
    Line,
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart',
    },
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