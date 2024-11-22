<!-- src/components/Charts/LineChart.vue -->
<template>
  <Line :id="chartId" ref="chartRef" :data="chartData" :options="chartOptions" />
</template>

<script>
import { defineComponent, ref, watch, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import 'chart.js/auto'; // 모든 Chart.js 컴포넌트를 자동으로 등록

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

    const updateGradients = (chartComponent) => {
      console.log('updateGradients called with:', chartComponent);
      if (!chartComponent) return;

      // vue-chartjs v4에서는 Chart.js 인스턴스가 'chart' 프로퍼티에 존재합니다.
      const chart = chartComponent.chart;
      console.log('chart:', chart);
      if (!chart) {
        console.error('Chart instance is undefined');
        return;
      }

      const ctx = chart.ctx;
      console.log('ctx:', ctx);
      if (!ctx) {
        console.error('Canvas context is undefined');
        return;
      }

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