import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class WsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
  
    // WebSocket 서버 초기화
    afterInit(server: Server) {
      console.log('WebSocket 서버 초기화 완료');
    }
  
    // 클라이언트가 연결됐을 때 실행
    handleConnection(client: Socket, ...args: any[]) {
      console.log('클라이언트 연결됨:', client.id);
    }
  
    // 클라이언트 연결이 끊겼을 때 실행
    handleDisconnect(client: Socket) {
      console.log('클라이언트 연결 끊김:', client.id);
    }
  
    // 특정 이벤트 처리 (예: 명령어 수신)
    @SubscribeMessage('command')
    handleCommand(@MessageBody() data: any): void {
      console.log('명령어 수신:', data);
      // 받은 명령어를 처리 후 응답 전송
      this.server.emit('command_response', { result: '명령어 처리 완료', command: data });
    }
  
    // 주기적으로 센서 데이터 전송 예시
    sendSensorData(sensorData: any) {
      this.server.emit('sensor_data', sensorData);
    }
  }