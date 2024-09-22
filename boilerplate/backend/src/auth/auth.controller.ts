import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body) {
    return this.authService.register(body);
  }

  // 아이디 중복 확인을 위한 엔드포인트 추가
  @Post('check-username')
  async checkUsername(@Body() body) {
    const isAvailable = await this.authService.isUsernameAvailable(body.username);
    return { available: isAvailable };
  }
}
