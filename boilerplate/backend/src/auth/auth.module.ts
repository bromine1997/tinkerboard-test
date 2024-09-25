import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthRepository } from './auth.repository'; // AuthRepository import

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SECRET_KEY', // JWT 비밀 키 설정
      signOptions: { expiresIn: '1d' }, // JWT 만료 시간 설정
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }), // Passport 모듈 설정
  ],
  controllers: [AuthController], // AuthController 등록
  providers: [AuthService, AuthRepository, JwtStrategy], // AuthService, AuthRepository, JwtStrategy 제공
  exports: [AuthService], // AuthService를 다른 모듈에서 사용할 수 있게 내보냄
})
export class AuthModule {}
