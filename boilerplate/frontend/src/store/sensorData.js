// src/store/sensorData.js
import { defineStore } from 'pinia';

export const useSensorDataStore = defineStore('sensorData', {
  state: () => ({
    pressureData: [],
    metrics: {
      oxygen: 9999,
      carbonDioxide: 9999,
      temperature: 9999,
      humidity: 9999,
      pressure: 9999,
      flowRate: 9999, // 'flowRate'로 통일
      setPoint: 9999,
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

      // metrics 객체를 한번에 업데이트
      this.$patch({
        metrics: {
          oxygen: newData.sensorData.oxygen,
          carbonDioxide: newData.sensorData.co2,
          temperature: newData.sensorData.temperature,
          humidity: newData.sensorData.humidity,
          pressure: newData.sensorData.pressure,
          flowRate: newData.sensorData.flowRate,
          setPoint: newData.setPoint,
        },
      });
      console.log('metrics 업데이트 완료:', this.metrics);
    },
  },
});
