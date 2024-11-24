// src/stores/websocket.js
import { defineStore } from 'pinia';
import { io } from 'socket.io-client';
import { ref } from 'vue';

export const useWebSocketStore = defineStore('websocket', () => {
  const socket = ref(null);
  const isConnected = ref(false);
  const serverCommands = ref([]);
  const sensorData = ref([]);

  // WebSocket 초기화
  const initWebSocket = () => {
    // WebSocket 서버 URL을 설정합니다.
    socket.value = io('http://localhost:8080', {
      // 필요한 옵션 설정 (예: 인증 토큰 등)
    });

    // 연결 성공 시
    socket.value.on('connect', () => {
      isConnected.value = true;
      console.log('WebSocket 연결 성공');
    });

    // 연결 해제 시
    socket.value.on('disconnect', () => {
      isConnected.value = false;
      console.log('WebSocket 연결 해제');
    });

    // 센서 데이터 수신
    socket.value.on('sensor_data_update', (data) => {
      sensorData.value.push(data);
      console.log('센서 데이터 수신:', data);
    });

    // 서버 명령 수신
    socket.value.on('server_command', (command) => {
      serverCommands.value.push(command);
      console.log('서버 명령 수신:', command);
      // 명령에 따라 추가적인 로직을 실행할 수 있습니다.
      handleServerCommand(command);
    });
  };

  // WebSocket 종료
  const disconnectWebSocket = () => {
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
      isConnected.value = false;
    }
  };

  // 명령어 전송
  const sendCommand = (action) => {
    if (socket.value && isConnected.value) {
      socket.value.emit('client_command', { action });
      console.log('명령어 전송:', action);
    } else {
      console.error('WebSocket 연결이 끊어졌습니다.');
    }
  };

  // 서버 명령 처리 (필요에 따라 수정)
  const handleServerCommand = (command) => {
    // 예시: 명령어에 따라 상태를 업데이트하거나 알림을 표시
    switch (command.action) {
      case 'START':
        // PID 제어 시작
        break;
      case 'PAUSE':
        // PID 제어 일시 정지
        break;
      case 'RESUME':
        // PID 제어 재개
        break;
      case 'STOP':
        // PID 제어 중지
        break;
      default:
        console.warn('알 수 없는 명령어:', command.action);
    }
  };

  return {
    socket,
    isConnected,
    serverCommands,
    sensorData,
    initWebSocket,
    disconnectWebSocket,
    sendCommand,
  };
});
