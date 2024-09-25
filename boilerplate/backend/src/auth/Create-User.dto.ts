import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MinLength, Matches, IsDate, IsEnum } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'john_doe',
    description: '사용자 아이디',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'John Doe',
    description: '사용자 이름',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Password123!',
    description: '사용자 비밀번호',
  })
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/, {
    message: '비밀번호는 최소 6자이며 문자와 숫자를 포함해야 합니다.',
  })
  password: string;

  @ApiProperty({
    example: '010-1234-5678',
    description: '사용자 전화번호',
  })
  phone?: string;

  @ApiProperty({
    example: 'john@example.com',
    description: '사용자 이메일',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '1990-01-01',
    description: '사용자 생년월일 (YYYY-MM-DD)',
  })
  @IsDate()
  birthDate: string;

  @ApiProperty({
    example: 'male',
    description: '성별 (male/female)',
  })
  @IsEnum(['male', 'female'])
  gender: string;

  @ApiProperty({
    example: 'member',
    description: '사용자 권한 (member/admin/operator)',
  })
  @IsEnum(['member', 'admin', 'operator'])
  role: string;
}
