import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository, IUser } from './auth.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async findByUsername(username: string): Promise<IUser | null> {
    return this.authRepository.findByUsername(username);
  }

  async findUserById(userId: string): Promise<IUser | null> {
    return this.authRepository.findById(userId);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.authRepository.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('아이디 또는 비밀번호가 잘못되었습니다.');
    }
    const { password: _, ...result } = user;
    return result;
  }

  async isUsernameAvailable(username: string): Promise<boolean> {
    const user = await this.authRepository.findByUsername(username);
    return !user;
  }
}
