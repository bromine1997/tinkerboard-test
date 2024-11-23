<!-- src/components/Charts/TimeSeriesChart.vue -->
<template>
  <div ref="chartRef" :style="{ width: '100%', height: '400px' }"></div>
</template>

<script>
import { defineComponent, ref, watch, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";

export default defineComponent({
  name: "TimeSeriesChart",
  props: {
    rawData: {
      type: Array,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => ({}),
    },
    interval: {
      type: Number,
      default: 1, // 1분 단위 데이터
    },
  },
  setup(props) {
    const chartRef = ref(null);
    let chartInstance = null;

    /**
     * 데이터를 압축하는 함수
     * interval 단위로 데이터를 샘플링하며, 값이 동일한 유지 구간도 포함
     */
    const compressData = (data, interval) => {
      const compressed = [];
      let lastValue = null;

      for (let i = 0; i < data.length; i++) {
        // interval 간격으로 샘플링
        if (i % interval === 0 || data[i].value !== lastValue) {
          compressed.push(data[i]);
          lastValue = data[i].value; // 마지막 값을 업데이트
        }
      }

      return compressed;
    };

    /**
     * ECharts 초기화
     */
    const initChart = () => {
      if (!chartRef.value) return;

      chartInstance = echarts.init(chartRef.value);

      // 데이터를 압축하여 차트에 사용
      const compressedData = compressData(props.rawData, props.interval);

      const option = {
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: compressedData.map((item) => item.time), // 시간 데이터
          axisLabel: {
            formatter: (value) => new Date(value).toLocaleTimeString(),
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "line",
            data: compressedData.map((item) => item.value), // 값 데이터
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(72,72,176,0.2)" },
                { offset: 1, color: "rgba(72,72,176,0.0)" },
              ]),
            },
            smooth: true, // 부드러운 곡선
            lineStyle: {
              color: "#2380f7",
            },
            symbol: "circle",
            symbolSize: 6,
          },
        ],
        ...props.chartOptions, // 추가 옵션 병합
      };

      chartInstance.setOption(option);
    };

    /**
     * 차트를 리사이즈
     */
    const resizeChart = () => {
      if (chartInstance) {
        chartInstance.resize();
      }
    };

    watch(
      () => props.rawData,
      () => {
        initChart(); // 데이터 변경 시 차트를 갱신
      },
      { deep: true }
    );

    onMounted(() => {
      initChart();
      window.addEventListener("resize", resizeChart);
    });

    onBeforeUnmount(() => {
      if (chartInstance) {
        chartInstance.dispose(); // 메모리 누수 방지
      }
      window.removeEventListener("resize", resizeChart);
    });

    return {
      chartRef,
    };
  },
});
</script>

<style scoped>
/* 추가적인 스타일을 정의할 수 있습니다 */
</style>
