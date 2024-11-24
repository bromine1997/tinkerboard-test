<template>
  <div class="profile-chart" ref="chartRef" style="width: 100%; height: 300px;"></div>
</template>

<script>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

export default {
  name: 'ProfileChart',
  props: {
    profileSections: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const chartRef = ref(null);
    let chartInstance = null;

    const initChart = () => {
      if (chartRef.value) {
        chartInstance = echarts.init(chartRef.value);
        renderChart();
      }
    };

    const renderChart = () => {
      if (!chartInstance) return;

      const labels = props.profileSections.map(
        (section) => `구간 ${section.sectionNumber}`
      );
      const startPressures = props.profileSections.map(
        (section) => section.startPressure
      );
      const endPressures = props.profileSections.map(
        (section) => section.endPressure
      );

      const option = {
        title: {
          text: '압력 프로파일',
          left: 'center',
          textStyle: {
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['시작 압력 (ATA)', '종료 압력 (ATA)'],
          top: 30,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: labels,
          name: '구간',
          nameLocation: 'middle',
          nameGap: 25,
        },
        yAxis: {
          type: 'value',
          name: '압력 (ATA)',
          nameLocation: 'middle',
          nameGap: 50,
          min: 0,
          axisLabel: {
            formatter: '{value}',
          },
        },
        series: [
          {
            name: '시작 압력 (ATA)',
            type: 'line',
            data: startPressures,
            smooth: true,
            lineStyle: {
              color: '#4BC0C0',
            },
            itemStyle: {
              color: '#4BC0C0',
            },
          },
          {
            name: '종료 압력 (ATA)',
            type: 'line',
            data: endPressures,
            smooth: true,
            lineStyle: {
              color: '#FF6384',
            },
            itemStyle: {
              color: '#FF6384',
            },
          },
        ],
      };

      chartInstance.setOption(option);
    };

    onMounted(() => {
      initChart();
    });

    watch(
      () => props.profileSections,
      () => {
        renderChart();
      },
      { deep: true }
    );

    onBeforeUnmount(() => {
      if (chartInstance) {
        chartInstance.dispose();
      }
    });

    return {
      chartRef,
    };
  },
};
</script>

<style scoped>
.profile-chart {
  width: 100%;
  height: 300px;
}
</style>
