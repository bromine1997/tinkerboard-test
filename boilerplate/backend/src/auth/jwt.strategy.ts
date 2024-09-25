import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service'; // AuthService import
import { JwtPayload } from './jwt-payload.interface'; // JwtPayload import

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'SECRET_KEY', // 환경 변수로 비밀 키 사용
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.findByUsername(payload.username); // AuthService를 사용하여 사용자 조회
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user; // 사용자 정보를 반환하여 인증을 완료
  }
}
