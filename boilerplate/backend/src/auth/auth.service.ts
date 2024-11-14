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
    console.log(`사용자 인증 시작: ${username}`);  // 사용자 인증 시작 로그

    const user = await this.authRepository.findByUsername(username);
  
    if (!user) {
      console.error(`사용자 찾기 실패: ${username} - 유효하지 않은 자격증명`);  // 사용자 찾기 실패 로그
      throw new UnauthorizedException('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  
    console.log(`요청된 비밀번호: ${password}`);  // 비밀번호 로그
    console.log(`DB에 저장된 해시된 비밀번호: ${user.password}`);  // 해시된 비밀번호 로그
  
    if (!password) {
      console.error(`비밀번호가 전달되지 않음: ${username}`);  // 비밀번호 없음 로그
      throw new UnauthorizedException('비밀번호가 필요합니다.');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      console.error(`비밀번호 검증 실패: ${username}`);  // 비밀번호 검증 실패 로그
      throw new UnauthorizedException('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  
    console.log(`비밀번호 검증 성공: ${username}`);  // 비밀번호 검증 성공 로그
  
    const { password: _password, ...result } = user;
    return result;
  }

  // JWT 토큰 생성
  async login(loginDto: LoginDto) {
    console.log(`로그인 시도: ${loginDto.username}`);
    const user = await this.validateUser(loginDto.username, loginDto.password);
  
    const payload = { 
      username: user.username, 
      sub: user._id, 
      role: user.role // role 추가
    };
  
    console.log(`로그인 성공: ${user.username}`);
    console.log('JWT 토큰 발급 중...');
  
    const accessToken = this.jwtService.sign(payload);
  
    console.log('JWT 토큰 발급 완료, 클라이언트로 전송');
    return {
      access_token: accessToken,
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
