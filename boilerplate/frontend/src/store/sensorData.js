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
      console.log('Updating sensor data in store:', newData); // 데이터 출력

      // 데이터 매핑 시 키 이름이 일치하는지 확인
      this.pressureData.push({
        time: new Date().toLocaleTimeString(),
        value: newData.pressure,
      });

      this.metrics = {
        oxygen: newData.oxygen,
        carbonDioxide: newData.co2, // co2 키 사용
        temperature: newData.temperature,
        humidity: newData.humidity,
        pressure: newData.pressure,
        flow: newData.flowRate,
      };
    },
  },
});