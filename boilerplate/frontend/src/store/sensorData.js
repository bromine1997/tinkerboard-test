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
        value: this.metrics.pressure,
      });
    
      // metrics 객체의 각 속성을 개별적으로 업데이트 및 로그 추가
      this.metrics.oxygen = newData.oxygen;
      console.log('oxygen updated to', this.metrics.oxygen);
      
      this.metrics.carbonDioxide = newData.carbonDioxide; // 올바른 키 사용
      console.log('carbonDioxide updated to', this.metrics.carbonDioxide);
      
      this.metrics.temperature = newData.temperature;
      console.log('temperature updated to', this.metrics.temperature);
      
      this.metrics.humidity = newData.humidity;
      console.log('humidity updated to', this.metrics.humidity);
      
      this.metrics.pressure = newData.pressure;
      console.log('pressure updated to', this.metrics.pressure);
      
      this.metrics.flow = newData.flowRate;
      console.log('flow updated to', this.metrics.flow);
      
      this.metrics.setPoint = newData.setPoint;
      console.log('setPoint updated to', this.metrics.setPoint);
    },
  },
});
