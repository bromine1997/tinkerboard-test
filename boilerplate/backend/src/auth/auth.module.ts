import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthRepository } from './auth.repository';
import { UserModule } from '../user/user.module'; // UserModule 임포트

@Module({
  imports: [
    UserModule, // UserModule을 통해 사용자 데이터 접근
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SECRET_KEY',
      signOptions: { expiresIn: '1d' }, // JWT 만료 시간 설정
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }), // Passport 모듈 설정
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
