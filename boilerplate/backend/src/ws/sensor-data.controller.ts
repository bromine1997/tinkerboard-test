// src/modules/sensor/controllers/sensor-data.controller.ts
import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { SensorDataService } from './sensor-data.service';
import { SensorDataPacketDto } from './sensor-data.dto';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiExceptionFilter } from '../core/filter/api-exception.filter';

@ApiTags('센서 데이터 API')
@Controller('sensor-data')
@UseFilters(ApiExceptionFilter)
export class SensorDataController {
  constructor(private readonly sensorDataService: SensorDataService) {}

  @ApiOperation({ summary: '센서 데이터 저장' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', description: '센서 데이터 저장 성공 메시지' },
        sensorDataId: { type: 'string', description: '저장된 센서 데이터 ID' },
      },
    },
  })
  @Post('save')
  async saveSensorData(@Body() sensorDataPacketDto: SensorDataPacketDto) {
    return this.sensorDataService.saveSensorData(sensorDataPacketDto);
  }

  // 필요한 경우 추가 엔드포인트 작성 (예: 데이터 조회 등)
}
