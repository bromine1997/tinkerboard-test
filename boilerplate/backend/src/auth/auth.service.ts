import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from './Create-User.dto';
import { LoginDto } from './login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService
  ) {}

  // 사용자 자격 증명 확인
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.authRepository.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // JWT 토큰 생성
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // 회원가입
  async register(createUserDto: CreateUserDto) {
    const isAvailable = await this.isUsernameAvailable(createUserDto.username);
    if (!isAvailable) {
      throw new UnauthorizedException('이미 사용 중인 사용자 이름입니다.');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const newUser = {
      ...createUserDto,
      password: hashedPassword,
    };

    const result = await this.authRepository.insertUser(newUser);
    if (result.acknowledged) {
      return { message: '회원가입 성공', user: { id: result.insertedId, username: newUser.username } };
    } else {
      throw new UnauthorizedException('회원가입 실패');
    }
  }

  // 아이디 중복 확인
  async isUsernameAvailable(username: string): Promise<boolean> {
    const user = await this.authRepository.findByUsername(username);
    return !user;
  }
}
