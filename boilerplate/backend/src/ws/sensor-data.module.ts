import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WsGateway } from './ws.gateway';
import { SensorDataService } from './sensor-data.service';
import { SensorDataRepository } from './sensor-data.repository';
import { SensorDataController } from './sensor-data.controller';
import { SensorDataPacket, SensorDataPacketSchema } from './sensor-data.schema';

@Module({
  imports: [
    // Mongoose를 사용하여 스키마 등록
    MongooseModule.forFeature([{ name: SensorDataPacket.name, schema: SensorDataPacketSchema }]),
  ],
  controllers: [SensorDataController], // 컨트롤러 등록
  providers: [
    WsGateway,           // WebSocket 게이트웨이 등록
    SensorDataService,   // 서비스 등록
    SensorDataRepository // 리포지토리 등록
  ],
  exports: [SensorDataService], // 필요한 경우 서비스 내보내기
})
export class SensorModule {}