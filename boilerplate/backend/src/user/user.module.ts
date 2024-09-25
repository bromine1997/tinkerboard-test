import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository'; // UserRepository import
import { databaseProviders } from '../database/database.providers'; // MongoDB providers 설정
import { CoreModule } from '../core/core.module'; // CoreModule 임포트 (ContextLogger 제공)

@Module({
  imports: [CoreModule],
  providers: [UserService, UserRepository, ...databaseProviders], // MongoDB providers 추가
  controllers: [UserController],
  exports: [UserService, UserRepository, ...databaseProviders], // 다른 모듈에서 사용할 수 있도록 export
})
export class UserModule {}
