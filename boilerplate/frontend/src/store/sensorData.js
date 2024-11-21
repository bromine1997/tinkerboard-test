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
      flow: 9999,
      setPoint: 9999, // setPoint 추가
    },
  }),
  actions: {

    updateSensorData(newData) {
      console.log('스토어에서 센서 데이터 업데이트중:', newData);
    
        // 압력 데이터 업데이트
      this.pressureData = [
        ...this.pressureData,
        {
          time: newData.elapsedTime,
          value: newData.sensorData.pressure,
        },
      ];

    
      // metrics 객체의 각 속성을 개별적으로 업데이트 및 로그 추가
      this.metrics.oxygen = newData.sensorData.oxygen;
      console.log('oxygen updated to', this.metrics.oxygen);
      
      this.metrics.carbonDioxide = newData.sensorData.co2;
      console.log('carbonDioxide updated to', this.metrics.carbonDioxide);
      
      this.metrics.temperature = newData.sensorData.temperature;
      console.log('temperature updated to', this.metrics.temperature);
      
      this.metrics.humidity = newData.sensorData.humidity;
      console.log('humidity updated to', this.metrics.humidity);
      
      this.metrics.pressure = newData.sensorData.pressure;
      console.log('pressure updated to', this.metrics.pressure);
      
      this.metrics.flow = newData.sensorData.flowRate;
      console.log('flow updated to', this.metrics.flow);
      
      this.metrics.setPoint = newData.setPoint;
      console.log('setPoint updated to', this.metrics.setPoint);
    },
  },
});
