import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { SensorDataService } from './sensor-data.service';
import { SensorDataRepository } from './sensor-data.repository';
import { SensorDataController } from './sensor-data.controller';
import { DatabaseModule } from '../database/database.module';
import { CoreModule } from '../core/core.module'; // CoreModule 임포트 (ContextLogger 제공)

@Module({
  imports: [DatabaseModule,CoreModule],
  controllers: [SensorDataController], // 컨트롤러 등록
  providers: [
    SensorDataService,   // 서비스 등록
    SensorDataRepository // 리포지토리 등록
  ],
  exports: [SensorDataService], // 필요한 경우 서비스 내보내기
})
export class SensorModule {}

