import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { WsModule } from './ws/ws.module'; // WebSocket 모듈 경로 추가
import { HealthCheckModule } from './health-check/health-check.module';
import { SampleTestModule } from './sample-test/sample-test.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), // 환경변수로 MongoDB URI 사용
      }),
    }),
    HealthCheckModule,
    SampleTestModule,
    WsModule,
    AuthModule, // AuthModule 추가
    UserModule, // UserModule 추가
  ],
})
export class AppModule {}
