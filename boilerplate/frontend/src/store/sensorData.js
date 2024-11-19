// src/store/sensorData.js
import { defineStore } from 'pinia';

export const useSensorDataStore = defineStore('sensorData', {
  state: () => ({
    pressureData: [],
    metrics: {
      oxygen: 0,
      carbonDioxide: 0,
      temperature: 0,
      humidity: 0,
      pressure: 0,
      flow: 0,
    },
  }),
  actions: {
    updateSensorData(newData) {
      // 압력 데이터 업데이트
      this.pressureData.push({
        time: newData.time,
        value: newData.metrics.pressure,
      });

      // 다른 지표 업데이트
      this.metrics = {
        oxygen: newData.metrics.oxygen,
        carbonDioxide: newData.metrics.carbonDioxide,
        temperature: newData.metrics.temperature,
        humidity: newData.metrics.humidity,
        pressure: newData.metrics.pressure,
        flow: newData.metrics.flow,
      };
    },
    // 필요에 따라 다른 액션 추가
  },
});
