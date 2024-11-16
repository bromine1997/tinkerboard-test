import { Body, Controller, Get, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // JWT 인증 가드

@ApiTags('사용자 API')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '특정 사용자 조회' })
  @UseGuards(JwtAuthGuard) // 인증 적용
  @Get()
  async getUser(@Request() req: any) {
    const userId = req.user.sub; // 토큰에서 userId 추출
    return this.userService.findById(userId);
  }

  @ApiOperation({ summary: '사용자 정보 수정' })
  @UseGuards(JwtAuthGuard) // 인증 적용
  @Put()
  async updateUser(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.sub; // 토큰에서 userId 추출
    return this.userService.updateUser(userId, updateUserDto);
  }

  @ApiOperation({ summary: '사용자 삭제' })
  @UseGuards(JwtAuthGuard) // 인증 적용
  @Delete()
  async deleteUser(@Request() req: any) {
    const userId = req.user.sub; // 토큰에서 userId 추출
    return this.userService.deleteUser(userId);
  }
}
