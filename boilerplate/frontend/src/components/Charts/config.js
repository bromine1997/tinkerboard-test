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
    show: false,
  },
  grid: {
    left: '10%',
    right: '10%',
    top: '10%',
    bottom: '10%',
    containLabel: true,
  },
};

export const blueChartOptions = {
  ...basicOptions,
  yAxis: {
    type: 'value',
    name: '압력(ATA)',
    min: 0,
    max: 5,
    axisLine: {
      lineStyle: {
        color: '#2380f7',
      },
    },
    axisLabel: {
      color: '#2380f7',
      padding: 5,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(29,140,248,0.0)',
      },
    },
  },
  xAxis: {
    type: 'category',
    name: '시간(분)',
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: '#2380f7',
      },
    },
    axisLabel: {
      color: '#2380f7',
      padding: 20,
      interval: 9,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(29,140,248,0.1)',
      },
    },
  },
  series: [
    {
      name: 'Pressure Data',
      type: 'line',
      smooth: true,
      sampling: 'lttb',  // LTTB 샘플링 추가
      samplingThreshold: 200, // 데이터 포인트가 200개 이상일 때 샘플링 시작
      animation: false,  // 실시간 데이터를 위해 애니메이션 비활성화
      data: [], 
      lineStyle: {
        color: '#2380f7',
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
      // 대용량 데이터 처리를 위한 설정
      progressive: 500,  // 한 프레임당 렌더링할 데이터 포인트 수
      progressiveThreshold: 3000,  // progressive rendering 시작 임계값
    },
  ],
};