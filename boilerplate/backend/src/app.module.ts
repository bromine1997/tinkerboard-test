import { Module } from '@nestjs/common';
import { HealthCheckController } from './controller/health-check.controller';

@Module({
  imports: [],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}
