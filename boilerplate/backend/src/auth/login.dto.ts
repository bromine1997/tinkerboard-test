import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'john_doe',
    description: '사용자 아이디',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'Password123!',
    description: '사용자 비밀번호',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
      