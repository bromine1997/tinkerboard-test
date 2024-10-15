// src/pressure-profile/pressure-profile.controller.ts

import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { PressureProfileService } from './pressure-profile.service';
import { CreateProfileDto } from './create-profile.dto';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiExceptionFilter } from '../core/filter/api-exception.filter';

@ApiTags('압력 프로파일 API')
@Controller('profile')
@UseFilters(ApiExceptionFilter)
export class PressureProfileController {
  constructor(private readonly profileService: PressureProfileService) {}

  @ApiOperation({ summary: '압력 프로파일 저장' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', description: '프로파일 저장 성공 메시지' },
        profileId: { type: 'string', description: '저장된 프로파일 ID' },
      },
    },
  })
  @Post('save')
  async saveProfile(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.saveProfile(createProfileDto);
  }

  // 필요한 경우 추가 엔드포인트 작성 (예: 프로파일 조회 등)
}
