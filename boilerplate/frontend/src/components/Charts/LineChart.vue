



<template>
  <div :id="chartId" ref="chartRef" style="width: 100%; height: 400px;"></div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
  name: 'LineChart',
  props: {
    chartId: {
      type: String,
      default: 'line-chart',
    },
    chartData: {
      type: Object,
      required: true,
    },
    gradientColors: {
      type: Array,
      default: () => [
        'rgba(72,72,176,0.2)',
        'rgba(72,72,176,0.0)',
        'rgba(119,52,169,0)',
      ],
    },
    gradientStops: {
      type: Array,
      default: () => [0, 0.5, 1],
    },
    extraOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const chartRef = ref(null);
    let chartInstance = null;

    const initializeChart = () => {
      if (chartInstance) {
        chartInstance.dispose(); // 기존 차트 인스턴스를 제거
      }
      chartInstance = echarts.init(chartRef.value);

      // ECharts 옵션 설정
      const gradient = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: props.gradientStops.map((stop, index) => ({
          offset: stop,
          color: props.gradientColors[index],
        })),
      };

      const options = {
        xAxis: {
          type: 'category',
          data: props.chartData.labels,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: props.chartData.datasets[0].data,
            type: 'line',
            smooth: true,
            areaStyle: { color: gradient },
            lineStyle: { color: props.gradientColors[0] },
          },
        ],
        ...props.extraOptions,
      };

      chartInstance.setOption(options);
    };

    watch(
      () => props.chartData,
      () => {
        if (chartInstance) {
          initializeChart();
        }
      },
      { deep: true }
    );

    onMounted(() => {
      initializeChart();
    });

    return {
      chartRef,
    };
  },
});
</script>
