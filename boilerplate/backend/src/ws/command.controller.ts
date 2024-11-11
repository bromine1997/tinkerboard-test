// src/modules/sensor/controllers/command.controller.ts
import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { CommandDto } from './command.dto';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiExceptionFilter } from '../core/filter/api-exception.filter';

@ApiTags('명령 API')
@Controller('command')
@UseFilters(ApiExceptionFilter)
export class CommandController {
  constructor(private readonly wsGateway: WsGateway) {}

  @ApiOperation({ summary: '명령 전송' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', description: '명령 전송 성공 여부' },
      },
    },
  })
  @Post('send')
  async sendCommand(@Body() commandDto: CommandDto) {
    // 모든 클라이언트에 명령 브로드캐스트
    this.wsGateway.broadcastCommand(commandDto);
    return { success: true };
  }
}
