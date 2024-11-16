// jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('JWT 토큰이 필요합니다.');
    }

    try {
      const payload = this.jwtService.verify(token);
      const user = await this.authService.findUserById(payload.sub); // userId로 사용자 조회
      if (!user) {
        throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
      }
      request.user = user; // 요청 객체에 사용자 정보 추가
      return true;
    } catch (error) {
      throw new UnauthorizedException('JWT 검증 실패');
    }
  }
}
