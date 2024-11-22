<template>
  <Line
    :id="chartId"
    ref="chartRef"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
import { defineComponent, ref, watch, onMounted, nextTick } from 'vue';
import { Line } from 'vue-chartjs';

export default defineComponent({
  name: 'LineChart',
  components: {
    Line
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    chartData: {
      type: Object,
      required: true
    },
    extraOptions: {
      type: Object,
      default: () => ({})
    },
    gradientColors: {
      type: Array,
      default: () => [
        'rgba(72,72,176,0.2)',
        'rgba(72,72,176,0.0)',
        'rgba(119,52,169,0)'
      ],
      validator: (val) => val.length > 2
    },
    gradientStops: {
      type: Array,
      default: () => [1, 0.4, 0],
      validator: (val) => val.length > 2
    }
  },
  setup(props) {
    const chartRef = ref(null);
    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      ...props.extraOptions
    });

    const updateGradients = async () => {
      await nextTick();
      
      if (!chartRef.value) {
        console.warn('Chart reference not found');
        return;
      }

      const chartInstance = chartRef.value.chart;
      
      if (!chartInstance) {
        console.warn('Chart instance not found');
        return;
      }

      const ctx = chartInstance.ctx;
      const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      props.gradientStops.forEach((stop, index) => {
        gradientStroke.addColorStop(stop, props.gradientColors[index]);
      });

      if (chartInstance.data && chartInstance.data.datasets) {
        chartInstance.data.datasets.forEach((dataset) => {
          dataset.backgroundColor = gradientStroke;
        });

        chartInstance.update('none'); // 애니메이션 없이 업데이트
      }
    };

    // chartData가 변경될 때마다 그라데이션 업데이트
    watch(
      () => props.chartData,
      async () => {
        await updateGradients();
      },
      { deep: true }
    );

    // extraOptions가 변경될 때 차트 옵션 업데이트
    watch(
      () => props.extraOptions,
      (newOptions) => {
        chartOptions.value = {
          responsive: true,
          maintainAspectRatio: false,
          ...newOptions
        };
      },
      { deep: true }
    );

    onMounted(async () => {
      await updateGradients();
    });

    return {
      chartRef,
      chartOptions
    };
  }
});
</script>