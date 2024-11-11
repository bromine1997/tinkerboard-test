// src/modules/sensor/gateways/ws.gateway.ts
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { SensorDataService } from './sensor-data.service';
import { SensorDataPacketDto } from './sensor-data.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly sensorDataService: SensorDataService) {}

  afterInit(server: Server) {
    console.log('Socket.IO 서버 초기화 완료');
  }

  handleConnection(client: Socket) {
    console.log('클라이언트 연결됨:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('클라이언트 연결 끊김:', client.id);
  }

  @SubscribeMessage('sensor_data')
  async handleSensorData(@MessageBody() payload: any): Promise<void> {
    console.log('센서 데이터 수신:', payload);

    // DTO로 변환 및 유효성 검사
    const sensorDataPacketDto = plainToClass(SensorDataPacketDto, payload);
    const errors = await validate(sensorDataPacketDto);

    if (errors.length > 0) {
      console.error('유효성 검사 실패:', errors);
      return;
    }

    try {
      await this.sensorDataService.saveSensorData(sensorDataPacketDto);
      console.log('센서 데이터 저장 성공');
    } catch (error) {
      console.error('센서 데이터 저장 실패:', error);
    }
  }

  // 명령을 클라이언트로 브로드캐스트하는 메서드
  broadcastCommand(command: any) {
    this.server.emit('server_command', command);
  }
}
