import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', description: '사용자 이름', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'john@example.com', description: '사용자 이메일', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '010-1234-5678', description: '사용자 전화번호', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: '1990-01-01', description: '사용자 생년월일', required: false })
  @IsString()
  @IsOptional()
  birthDate?: string;

  @ApiProperty({ example: 'male', description: '성별 (male/female)', required: false })
  @IsEnum(['male', 'female'])
  @IsOptional()
  gender?: string;
}
