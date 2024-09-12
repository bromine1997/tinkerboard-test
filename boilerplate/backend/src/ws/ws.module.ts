import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';

@Module({
  providers: [WsGateway],  // Gateway 등록
})
export class WsModule {}