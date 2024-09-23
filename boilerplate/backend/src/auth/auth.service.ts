import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service'; // UserService 가져오기
import { JwtService } from '@nestjs/jwt'; // JWT 사용
import { CreateUserDto } from '../user/user.dto';  // user.dto.ts에서 가져오기


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, // UserService 주입
    private jwtService: JwtService // JWT 서비스 주입
  ) {}

  // 사용자 자격 증명을 확인하는 메서드
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username); // 사용자 조회
    if (user && user.password === password) { // 비밀번호 비교 (해싱이 필요한 경우 해싱 검증 추가)
      const { password, ...result } = user;
      return result; // 비밀번호를 제외한 사용자 정보 반환
    }
    return null;
  }

  // 로그인 후 JWT 토큰을 반환하는 메서드
  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // 회원가입 로직 (이미 구현한 register 메서드)
  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return { message: '회원가입 성공', user };
  }

   // 유저네임 중복 확인 로직
   async isUsernameAvailable(username: string): Promise<boolean> {
    const user = await this.userService.findByUsername(username);
    return !user; // 유저가 없으면 true, 있으면 false
  }
}
