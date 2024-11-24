import { defineStore } from 'pinia';
import { inject } from 'vue';

export const useSensorDataStore = defineStore('sensorData', {
  state: () => ({
    pressureData: [
      { time: 0, value: 1 }, // 초기 데이터 포인트
    ],
    metrics: {
      oxygen: 0,
      carbonDioxide: 0,
      temperature: 26.5,
      humidity: 25,
      pressure: 1,
      flow: 9999,
      setPoint: 9999,
    },
    pressureBuffer: [], // 압력 데이터 버퍼
    
    maxPressureDataPoints: 180, // 최대 데이터 포인트 수 (예: 3시간)
  }),
  actions: {
    updateSensorData(newData) {
      
      // 압력 데이터 버퍼에 추가
      this.pressureBuffer.push({
        time: newData.elapsedTime,
        value: newData.sensorData.pressure,
      });
      console.log('pressureBuffer 업데이트:', this.pressureBuffer);

      // 60번째 데이터 포인트가 들어왔을 때 압력 데이터 추가
      if (this.pressureBuffer.length >= 60) {
        const sixtiethDataPoint = this.pressureBuffer[59]; // 0부터 시작하므로 인덱스 59
        const newTime = this.pressureData.length; // 새로운 시간 인덱스 (1, 2, 3, ...)
        
        this.pressureData.push({
          time: newTime,
          value: sixtiethDataPoint.value,
        });
        console.log(`압력 데이터 집계 추가: 시간=${newTime}, 값=${sixtiethDataPoint.value}`);
        
        // 최대 데이터 포인트 수 초과 시 가장 오래된 데이터 제거
        if (this.pressureData.length > this.maxPressureDataPoints) {
          this.pressureData.shift();
          console.log('최대 압력 데이터 포인트 수 초과: 가장 오래된 데이터 제거');
        }
        
        // 압력 버퍼 초기화
        this.pressureBuffer = [];
      }

      // metrics 객체의 각 속성을 개별적으로 업데이트 및 로그 추가
      this.metrics.oxygen = newData.sensorData.oxygen;
     // console.log('oxygen updated to', this.metrics.oxygen);
      
      this.metrics.carbonDioxide = newData.sensorData.co2;
     // console.log('carbonDioxide updated to', this.metrics.carbonDioxide);
      
      this.metrics.temperature = newData.sensorData.temperature;
      //console.log('temperature updated to', this.metrics.temperature);
      
      this.metrics.humidity = newData.sensorData.humidity;
      //console.log('humidity updated to', this.metrics.humidity);
      
      this.metrics.pressure = newData.sensorData.pressure;
      //console.log('pressure updated to', this.metrics.pressure);
      
      this.metrics.flow = newData.sensorData.flowRate;
      //console.log('flow updated to', this.metrics.flow);
      
      this.metrics.setPoint = newData.setPoint;
      //console.log('setPoint updated to', this.metrics.setPoint);
    },

    sendCommand(action) {
      const socket = inject('socket'); // 웹소켓 인스턴스 주입
      if (socket && socket.connected) {
        socket.emit('command', action);
        console.log(`${action} 명령 전송`);
      } else {
        console.error('웹소켓 연결이 되어 있지 않습니다.');
      }
    },
   
  },

});
