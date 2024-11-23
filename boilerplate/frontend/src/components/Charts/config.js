// src/components/Charts/config.js
import * as echarts from 'echarts';

export const basicOptions = {
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    textStyle: {
      color: '#333',
    },
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#333',
      },
    },
  },
  legend: {
    show: false, // 기본적으로 범례 숨김
  },
  grid: {
    left: '10%',
    right: '10%',
    top: '10%',
    bottom: '10%',
    containLabel: true,
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 100,
      minSpan: 10,
      maxSpan: 100,
    },
    {
      type: 'slider',
      start: 0,
      end: 100,
      minSpan: 10,
      maxSpan: 100,
    },
  ],
};

export const blueChartOptions = {
  ...basicOptions,
  yAxis: {
    type: 'value',
    min: -5,
    max: 5,
    axisLine: {
      lineStyle: {
        color: '#2380f7', // y축 색상
      },
    },
    axisLabel: {
      color: '#2380f7',
      padding: 10,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(29,140,248,0.0)', // y축 그리드 라인 색상
      },
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: '#2380f7', // x축 색상
      },
    },
    axisLabel: {
      color: '#2380f7',
      padding: 10,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(29,140,248,0.1)', // x축 그리드 라인 색상
      },
    },
  },
  series: [
    {
      name: 'Pressure Data',
      type: 'line',
      smooth: true,
      data: [], // 데이터는 컴포넌트에서 설정
      lineStyle: {
        color: '#2380f7', // 선 색상
        width: 2,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(29,140,248,0.4)' },
          { offset: 1, color: 'rgba(29,140,248,0.0)' },
        ]),
      },
      symbol: 'circle',
      symbolSize: 6,
    },
  ],
};

// 다른 차트 옵션(purpleChartOptions, orangeChartOptions 등)도 유사하게 업데이트하세요.
// 그라디언트나 스타일이 ECharts와 호환되도록 정의해야 합니다.
