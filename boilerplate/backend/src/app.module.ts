import { Module } from '@nestjs/common';
import { HealthCheckController } from './controller/health-check.controller';

@Module({
  imports: [],
  controllers: [HealthCheckController],
})
export class AppModule {}
