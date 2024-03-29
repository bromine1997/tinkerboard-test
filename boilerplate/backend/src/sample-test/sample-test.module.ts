import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { DatabaseModule } from 'src/database/database.module';
import { SampleTestV1Controller } from './controller/sample-test-v1.controller';
import { SampleTestService } from './service/sample-test.service';
import { TestRepository } from './repository/test.repository';

@Module({
  imports: [CoreModule, DatabaseModule],
  providers: [SampleTestService, TestRepository],
  controllers: [SampleTestV1Controller],
})
export class SampleTestModule {}
