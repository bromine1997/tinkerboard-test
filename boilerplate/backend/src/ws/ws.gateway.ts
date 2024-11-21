// src/modules/sensor/gateways/ws.gateway.ts
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
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
  async handleSensorData(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any
  ): Promise<void> {
    console.log('센서 데이터 수신:', payload);

    // DTO로 변환 및 유효성 검사
    const sensorDataPacketDto = plainToClass(SensorDataPacketDto, payload);
    const errors = await validate(sensorDataPacketDto);

    if (errors.length > 0) {
      console.error('유효성 검사 실패:', errors);
      return;
    }

    try {
      // 실시간 데이터 브로드캐스트 (발신 클라이언트를 제외한 모든 클라이언트에게 전송)

      const elapsedTimeInSeconds = Math.floor(sensorDataPacketDto.elapsedTime / 1000);
      const FormatsetPoint = parseFloat((sensorDataPacketDto.setPoint / 1000).toFixed(3));

      client.broadcast.emit('sensor_data_update', {

        deviceId: sensorDataPacketDto.deviceId,
        sensorData: sensorDataPacketDto.sensorData,
        elapsedTime: elapsedTimeInSeconds,             // 밀리초를 초 단위로 변환해서 클라이언트에 전송
        setPoint: FormatsetPoint,
        timestamp: new Date(),
      });

      // 센서 데이터 저장
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
