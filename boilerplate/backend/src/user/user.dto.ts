import { IsString, IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';


export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    example: 'john_doe',
    description: '사용자 아이디',
    required: true,
  })
  username: string;

  @ApiProperty({
    type: 'string',
    example: 'John Doe',
    description: '사용자 이름',
    required: true,
  })
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'john@example.com',
    description: '사용자 이메일',
    required: true,
  })
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'Password123!',
    description: '사용자 비밀번호',
    required: true,
  })
  password: string;

  @ApiProperty({
    type: 'string',
    example: '010-1234-5678',
    description: '사용자 전화번호',
    required: false,
  })
  phone?: string;

  @ApiProperty({
    type: 'string',
    example: '1990-01-01',
    description: '생년월일 (YYYY-MM-DD 형식)',
    required: true,
  })
  birthDate: string;

  @ApiProperty({
    type: 'string',
    example: 'male',
    description: '성별 (male/female)',
    required: true,
  })
  gender: string;

  @ApiProperty({
    type: 'string',
    example: 'user',
    description: '권한 (user/admin)',
    required: true,
  })
  role: string;
}
  
  export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
      type: 'string',
      example: 'new_password123!',
      description: '새 비밀번호 (선택 사항)',
      required: false,
    })
    password?: string;
  }