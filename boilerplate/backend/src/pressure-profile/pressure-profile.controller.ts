import { Controller, Post, Get, Param, Body, UseFilters } from '@nestjs/common';
import { PressureProfileService } from './pressure-profile.service';
import { CreateProfileDto } from './create-profile.dto';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiExceptionFilter } from '../core/filter/api-exception.filter';
import { Req } from '@nestjs/common';


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
    const userId = createProfileDto.userId; // 요청 바디에서 userId 추출
    return this.profileService.saveProfile(createProfileDto, userId);
  }


  @ApiOperation({ summary: '압력 프로파일 조회' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string', description: '프로파일 ID' },
        name: { type: 'string', description: '프로파일 이름' },
        profileSections: { type: 'array', items: { type: 'object' } },
        createdAt: { type: 'string', description: '생성 날짜' },
        createdBy: { type: 'string', description: '생성한 사용자 ID' },
      },
    },
  })
  @Get(':id')
  async getProfile(@Param('id') id: string) {
    return this.profileService.getProfileById(id);
  }

  // 모든 프로파일 가져오기 엔드포인트 추가
  @ApiOperation({ summary: '모든 압력 프로파일 조회' })
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string', description: '프로파일 ID' },
          name: { type: 'string', description: '프로파일 이름' },
          profileSections: { type: 'array', items: { type: 'object' } },
          createdAt: { type: 'string', description: '생성 날짜' },
          createdBy: { type: 'string', description: '생성한 사용자 ID' },
        },
      },
    },
  })
  @Get()
  async getAllProfiles() {
    return this.profileService.getAllProfiles();
  }

  // 최신 프로파일 가져오기 엔드포인트 추가
  @ApiOperation({ summary: '최신 압력 프로파일 조회' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string', description: '프로파일 ID' },
        profileSections: { type: 'array', items: { type: 'object' } },
        createdAt: { type: 'string', description: '생성 날짜' },
      },
    },
  })
  @Get('latest')
  async getLatestProfile() {
    return this.profileService.getLatestProfile();
  }
}