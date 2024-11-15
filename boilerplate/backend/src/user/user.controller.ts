import { Body, Controller, Get, Param, Put, Delete, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { UpdateUserDto } from './update-user.dto';

import { ApiExceptionFilter } from '../core/filter/api-exception.filter'; // 예외 필터 추가

@ApiTags('사용자 API')
@Controller('users')
@UseFilters(ApiExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '모든 사용자 조회' })
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: { $ref: '#/components/schemas/UserDto' },
    },
  })
  @Get()
  async getAllUsers() {
    return this.userService.findAll();

    
  }

  @ApiOperation({ summary: '특정 사용자 조회' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      $ref: '#/components/schemas/UserDto',
    },
  })
  @ApiParam({ name: 'id', description: '사용자 ID', required: true })
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @ApiOperation({ summary: '사용자 정보 수정' })
  @ApiParam({ name: 'id', description: '사용자 ID', required: true })
  @ApiOkResponse({
    schema: {
      type: 'object',
      $ref: '#/components/schemas/UserDto',
    },
  })
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @ApiOperation({ summary: '사용자 삭제' })
  @ApiParam({ name: 'id', description: '사용자 ID', required: true })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', description: '삭제 성공 메시지' },
      },
    },
  })
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }


}
