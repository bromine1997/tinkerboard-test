import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health check')
@Controller()
export class HealthCheckController {
  @Get('/health-check')
  getHello(): string {
    return 'api status ok';
  }
}
