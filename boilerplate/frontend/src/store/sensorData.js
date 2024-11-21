// src/store/sensorData.js
import { defineStore } from 'pinia';

export const useSensorDataStore = defineStore('sensorData', {
  state: () => ({
    pressureData: [],
    metrics: {
      oxygen: 1,
      carbonDioxide: 0,
      temperature: 0,
      humidity: 0,
      pressure: 0,
      flow: 0,
      setPoint: 0, // setPoint 추가
    },
  }),
  actions: {

    updateSensorData(newData) {
      console.log('스토어에서 센서 데이터 업데이트중:', newData);
    
      // Update pressureData array
      this.pressureData.push({
        time: newData.elapsedTime, 
        value: newData.pressure,
      });
    
      // Update metrics properties individually
      this.metrics.oxygen = newData.oxygen;
      this.metrics.carbonDioxide = newData.co2;
      this.metrics.temperature = newData.temperature;
      this.metrics.humidity = newData.humidity;
      this.metrics.pressure = newData.pressure;
      this.metrics.flow = newData.flowRate;
      this.metrics.setPoint = newData.setPoint; // setPoint 업데이트
    },
  },
});