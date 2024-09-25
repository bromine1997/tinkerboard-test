import { Controller, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiParam } from '@nestjs/swagger';  // ApiParam 추가
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { UpdateUserDto } from './update-user.dto';

@ApiTags('사용자 API')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '모든 사용자 조회' })
  @ApiOkResponse({ type: [UserDto] })
  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: '특정 사용자 조회' })
  @ApiOkResponse({ type: UserDto })
  @ApiParam({ name: 'id', description: '사용자 ID', required: true })  // ApiParam 추가
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @ApiOperation({ summary: '사용자 정보 수정' })
  @ApiParam({ name: 'id', description: '사용자 ID', required: true })  // ApiParam 추가
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @ApiOperation({ summary: '사용자 삭제' })
  @ApiParam({ name: 'id', description: '사용자 ID', required: true })  // ApiParam 추가
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
