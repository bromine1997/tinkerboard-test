import { Body, Controller, Post, UnauthorizedException, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ApiExceptionFilter } from '../core/filter/api-exception.filter'; // 예외 필터 추가
import { LoginDto } from './login.dto'; // LoginDto 가져오기
import { CreateUserDto } from './create-user.dto'


@ApiTags('인증 API')
@Controller('auth')
@UseFilters(ApiExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '사용자 로그인' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', description: 'JWT Access Token' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', description: '사용자 ID' },
            username: { type: 'string', description: '사용자 이름' },
          },
        },
      },
    },
  })
  @Post('login')
async login(@Body() body: LoginDto) {
  // 로그인 메서드를 호출하여 사용자 인증 및 JWT 토큰 발급 처리
  return this.authService.login(body);  // validateUser 호출 없이 login 메서드에서 처리
}

  @ApiOperation({ summary: '사용자 회원가입' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', description: '회원가입 성공 메시지' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', description: '생성된 사용자 ID' },
            username: { type: 'string', description: '사용자 이름' },
          },
        },
      },
    },
  })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    console.log('Received birthDate:', createUserDto.birthDate);
    return this.authService.register(createUserDto);
  }

  @ApiOperation({ summary: '아이디 중복 확인' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        available: { type: 'boolean', description: '아이디 사용 가능 여부' },
      },
    },
  })
  @Post('check-username')
  async checkUsername(@Body() body: { username: string }) {
    const isAvailable = await this.authService.isUsernameAvailable(body.username);
    return { available: isAvailable };
  }
}
