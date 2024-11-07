import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('Socket.IO 서버 초기화 완료');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('클라이언트 연결됨:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('클라이언트 연결 끊김:', client.id);
  }

  @SubscribeMessage('sensor_data')
  handleSensorData(client: Socket, payload: any): void {
    console.log('센서 데이터 수신:', payload);
    // 센서 데이터 처리 로직
  }

  // 명령을 클라이언트로 보내는 예시
  sendCommandToClient(clientId: string, command: any) {
    this.server.to(clientId).emit('server_command', command);
  }

  // 모든 클라이언트에 명령을 보내는 예시
  broadcastCommand(command: any) {
    this.server.emit('server_command', command);
  }
}
