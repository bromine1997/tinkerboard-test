// src/pressure-profile/pressure-profile.module.ts

import { Module } from '@nestjs/common';
import { PressureProfileService } from './pressure-profile.service';
import { PressureProfileController } from './pressure-profile.controller';
import { PressureProfileRepository } from './pressure-profile.repository';
import { DatabaseModule } from '../database/database.module';
import { CoreModule } from '../core/core.module'; // CoreModule 임포트 (ContextLogger 제공)


@Module({
  imports: [DatabaseModule,CoreModule],
  controllers: [PressureProfileController],
  providers: [PressureProfileService, PressureProfileRepository],
})
export class PressureProfileModule {}
