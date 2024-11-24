// src/stores/socketStore.js
import { defineStore } from 'pinia';
import { io } from 'socket.io-client';
import { ref } from 'vue';
import { useSensorDataStore } from './sensorData';

export const useSocketStore = defineStore('socket', () => {
  // 스토어 상태를 ref로 정의
  const connected = ref(false);
  const error = ref(null);
  
  // socket 인스턴스를 ref로 감싸서 반응성 부여
  const socket = ref(null);
  
  // 소켓 초기화 함수
  const initSocket = () => {
    socket.value = io('http://localhost:8080', {
      autoConnect: true,
    });

    const sensorDataStore = useSensorDataStore();

    socket.value.on('connect', () => {
      connected.value = true;
      console.log('웹소켓 연결 성공:', socket.value.id);
    });

    socket.value.on('disconnect', () => {
      connected.value = false;
      console.log('웹소켓 연결 해제');
    });

    socket.value.on('connect_error', (err) => {
      error.value = err;
      console.error('웹소켓 연결 에러:', err);
    });

    socket.value.on('sensor_data_update', (data) => {
      console.log('서버로부터 새로운 센서 데이터 수신:', data);
      sensorDataStore.updateSensorData(data);
    });
  };

  // 명령 전송 메소드
  const emitCommand = (command) => {
    console.log(`명령 전송 시도: ${command}`);
    if (connected.value && socket.value) {
      socket.value.emit('command', { action: command }, (response) => {
        console.log(`서버가 ${command} 명령을 확인했습니다:`, response);
      });
    } else {
      console.error('웹소켓이 연결되지 않았습니다. 명령을 전송할 수 없습니다:', command);
    }
  };

  // 초기화 즉시 실행
  initSocket();

  return {
    connected,
    error,
    emitCommand,
    socket
  };
});