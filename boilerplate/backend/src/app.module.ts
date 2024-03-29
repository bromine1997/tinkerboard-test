import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { SampleTestModule } from './sample-test/sample-test.module';

@Module({
  imports: [HealthCheckModule, SampleTestModule],
})
export class AppModule {}
