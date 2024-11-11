import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { DatabaseModule } from '../database/database.module';
import { SensorDataService } from './sensor-data.service';
import { SensorDataRepository } from './sensor-data.repository';



@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [
    WsGateway,
    SensorDataService,
    SensorDataRepository,
  ],
})
export class WsModule {}