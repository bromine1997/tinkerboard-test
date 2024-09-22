import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 모든 사용자 조회
  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  // 특정 사용자 조회
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  // 사용자 생성
  @Post()
  async createUser(@Body() userData: any) {
    return this.userService.createUser(userData);
  }

  // 사용자 업데이트
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateData: any) {
    return this.userService.updateUser(id, updateData);
  }

  // 사용자 삭제
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
