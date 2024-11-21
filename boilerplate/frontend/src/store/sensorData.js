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
    
      // 압력 데이터 업데이트
      this.pressureData.push({
        time: newData.elapsedTime, 
        value: newData.sensorData.pressure,
      });
      console.log('pressureData 업데이트:', this.pressureData);

      // metrics 객체의 각 속성을 개별적으로 업데이트
      this.metrics.oxygen = newData.sensorData.oxygen;
      console.log('oxygen updated to', this.metrics.oxygen);
      
      this.metrics.carbonDioxide = newData.sensorData.co2; // 이름 수정
      console.log('carbonDioxide updated to', this.metrics.carbonDioxide);
      
      this.metrics.temperature = newData.sensorData.temperature;
      console.log('temperature updated to', this.metrics.temperature);
      
      this.metrics.humidity = newData.sensorData.humidity;
      console.log('humidity updated to', this.metrics.humidity);
      
      this.metrics.pressure = newData.sensorData.pressure;
      console.log('pressure updated to', this.metrics.pressure);
      
      this.metrics.flowRate = newData.sensorData.flowRate; // 이름 수정
      console.log('flowRate updated to', this.metrics.flowRate);
      
      this.metrics.setPoint = newData.setPoint;
      console.log('setPoint updated to', this.metrics.setPoint);
    },
  },
});