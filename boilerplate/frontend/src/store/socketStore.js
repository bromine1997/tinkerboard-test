// src/stores/socketStore.js
import { defineStore } from 'pinia';
import { io } from 'socket.io-client';
import { ref } from 'vue';
import { useSensorDataStore } from './sensorData';

export const useSocketStore = defineStore('socket', () => {
  const socket = io('http://localhost:8080', {
    autoConnect: true, // 자동 연결 설정
  });

  const connected = ref(false);
  const error = ref(null);

  const sensorDataStore = useSensorDataStore();

  // 연결 성공 시
  socket.on('connect', () => {
    connected.value = true;
    console.log('웹소켓 연결 성공:', socket.id);
  });

  // 연결 해제 시
  socket.on('disconnect', () => {
    connected.value = false;
    console.log('웹소켓 연결 해제');
  });

  // 에러 발생 시
  socket.on('connect_error', (err) => {
    error.value = err;
    console.error('웹소켓 연결 에러:', err);
  });

  // 센서 데이터 업데이트 수신 시
  socket.on('sensor_data_update', (data) => {
    console.log('서버로부터 새로운 센서 데이터 수신:', data);
    sensorDataStore.updateSensorData(data);
  });

  // 명령 전송 메소드
  const emitCommand = (command) => {
    console.log(`명령 전송 시도: ${command}`);
    if (connected.value) {
      socket.emit('command', { action: command }, (response) => {
        console.log(`서버가 ${command} 명령을 확인했습니다:`, response);
      });
    } else {
      console.error('웹소켓이 연결되지 않았습니다. 명령을 전송할 수 없습니다:', command);
    }
  };

  return {
    socket,
    connected,
    error,
    emitCommand,
  };
});
