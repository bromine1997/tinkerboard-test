import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository'; // UserRepository import
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Mongoose 설정
  ],
  providers: [UserService, UserRepository], // UserRepository를 providers에 추가
  controllers: [UserController],
  exports: [UserService, UserRepository], // 다른 모듈에서 사용할 수 있도록 export
})
export class UserModule {}
