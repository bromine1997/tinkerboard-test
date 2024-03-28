import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health/health-check.module';

@Module({
  imports: [HealthCheckModule],
})
export class AppModule {}
