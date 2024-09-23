import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiExceptionFilter } from '../core/filter/api-exception.filter';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto'; // DTO를 사용한다고 가정

@ApiTags('USER API')
@Controller('/v1/users')
@UseFilters(ApiExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '모든 사용자 조회' })
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: '사용자 ID' },
          name: { type: 'string', description: '사용자 이름' },
          email: { type: 'string', description: '사용자 이메일' },
        },
      },
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
      properties: {
        id: { type: 'string', description: '사용자 ID' },
        name: { type: 'string', description: '사용자 이름' },
        email: { type: 'string', description: '사용자 이메일' },
      },
    },
  })
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @ApiOperation({ summary: '사용자 생성' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', description: '성공 여부', example: true },
        userId: { type: 'string', description: '생성된 사용자 ID', example: 'abc123' },
      },
    },
  })
  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @ApiOperation({ summary: '사용자 업데이트' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', description: '성공 여부', example: true },
      },
    },
  })
  @Put(':id')
  @HttpCode(200)
  async updateUser(@Param('id') id: string, @Body() updateData: UpdateUserDto) {
    return this.userService.updateUser(id, updateData);
  }

  @ApiOperation({ summary: '사용자 삭제' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', description: '성공 여부', example: true },
      },
    },
  })
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
