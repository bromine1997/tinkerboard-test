import { Module } from '@nestjs/common';
import { WsModule } from './ws/ws.module';  // WebSocket 모듈 경로 추가
import { HealthCheckModule } from './health-check/health-check.module';
import { SampleTestModule } from './sample-test/sample-test.module';

@Module({
  imports: [HealthCheckModule, SampleTestModule,WsModule],
})
export class AppModule {}
