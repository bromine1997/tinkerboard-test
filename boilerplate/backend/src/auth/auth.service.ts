import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && (await user.comparePassword(password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload: JwtPayload = { 
      username: user.username, 
      sub: user._id,
      role: user.role // role 필드 추가
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: any) {
    return this.userService.createUser(createUserDto);
  }
}
