// src/components/Charts/config.js

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
    show: false, // Chart.js의 legend.display: false와 유사
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
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(29,140,248,0.4)',
            },
            {
              offset: 1,
              color: 'rgba(29,140,248,0.0)',
            },
          ],
        },
      },
      symbol: 'circle',
      symbolSize: 6,
    },
  ],
};

export const purpleChartOptions = {
  ...basicOptions,
  yAxis: {
    type: 'value',
    min: 60,
    max: 125,
    axisLine: {
      lineStyle: {
        color: '#9a9a9a',
      },
    },
    axisLabel: {
      color: '#9a9a9a',
      padding: 20,
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
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: 'rgba(225,78,202,0.1)',
      },
    },
    axisLabel: {
      color: '#9a9a9a',
      padding: 20,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(225,78,202,0.1)',
      },
    },
  },
  series: [
    {
      name: 'Metric Data',
      type: 'line',
      smooth: true,
      data: [],
      lineStyle: {
        color: '#9a9a9a',
        width: 2,
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(225,78,202,0.4)',
            },
            {
              offset: 1,
              color: 'rgba(225,78,202,0.0)',
            },
          ],
        },
      },
      symbol: 'circle',
      symbolSize: 6,
    },
  ],
};

export const orangeChartOptions = {
  ...basicOptions,
  yAxis: {
    type: 'value',
    min: 50,
    max: 110,
    axisLine: {
      lineStyle: {
        color: '#ff8a76',
      },
    },
    axisLabel: {
      color: '#ff8a76',
      padding: 20,
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
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: 'rgba(220,53,69,0.1)',
      },
    },
    axisLabel: {
      color: '#ff8a76',
      padding: 20,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(220,53,69,0.1)',
      },
    },
  },
  series: [
    {
      name: 'Metric Data',
      type: 'line',
      smooth: true,
      data: [],
      lineStyle: {
        color: '#ff8a76',
        width: 2,
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(220,53,69,0.4)',
            },
            {
              offset: 1,
              color: 'rgba(220,53,69,0.0)',
            },
          ],
        },
      },
      symbol: 'circle',
      symbolSize: 6,
    },
  ],
};

export const greenChartOptions = {
  ...basicOptions,
  yAxis: {
    type: 'value',
    min: 50,
    max: 125,
    axisLine: {
      lineStyle: {
        color: '#9e9e9e',
      },
    },
    axisLabel: {
      color: '#9e9e9e',
      padding: 20,
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
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: 'rgba(0,242,195,0.1)',
      },
    },
    axisLabel: {
      color: '#9e9e9e',
      padding: 20,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(0,242,195,0.1)',
      },
    },
  },
  series: [
    {
      name: 'Metric Data',
      type: 'line',
      smooth: true,
      data: [],
      lineStyle: {
        color: '#9e9e9e',
        width: 2,
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(0,242,195,0.4)',
            },
            {
              offset: 1,
              color: 'rgba(0,242,195,0.0)',
            },
          ],
        },
      },
      symbol: 'circle',
      symbolSize: 6,
    },
  ],
};

export const barChartOptions = {
  ...basicOptions,
  yAxis: {
    type: 'value',
    min: 60,
    max: 120,
    axisLine: {
      lineStyle: {
        color: '#9e9e9e',
      },
    },
    axisLabel: {
      color: '#9e9e9e',
      padding: 20,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(29,140,248,0.1)',
      },
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    axisLine: {
      lineStyle: {
        color: 'rgba(29,140,248,0.1)',
      },
    },
    axisLabel: {
      color: '#9e9e9e',
      padding: 20,
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
      name: 'Bar Data',
      type: 'bar',
      data: [],
      itemStyle: {
        color: '#29C8F8', // 막대 색상
      },
      barWidth: '60%',
    },
  ],
};
