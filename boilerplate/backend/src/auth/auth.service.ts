import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './login.dto';
import * as bcrypt from 'bcrypt';
import { IUser } from './auth.repository';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService
  ) {}

  // 사용자 이름으로 사용자 조회
  async findByUsername(username: string): Promise<IUser | null> {
    return this.authRepository.findByUsername(username);
  }

  // 사용자 자격 증명 확인
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _password, ...result } = user;
    return result;
  }

  // JWT 토큰 생성
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // 회원가입
  async register(createUserDto: CreateUserDto) {
    const isAvailable = await this.isUsernameAvailable(createUserDto.username);
    if (!isAvailable) {
      throw new ConflictException('이미 사용 중인 사용자 이름입니다.');
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
      throw new ConflictException('회원가입 실패');
    }
  }

  // 아이디 중복 확인
  async isUsernameAvailable(username: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    return !user;
  }
}
