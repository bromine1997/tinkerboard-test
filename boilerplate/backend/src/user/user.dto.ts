import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'abc123', description: '사용자 ID' })
  _id: string;

  @ApiProperty({ example: 'John Doe', description: '사용자 이름' })
  name: string;

  @ApiProperty({ example: 'john@example.com', description: '사용자 이메일' })
  email: string;

  @ApiProperty({ example: '010-1234-5678', description: '사용자 전화번호' })
  phone: string;

  @ApiProperty({ example: '1990-01-01', description: '사용자 생년월일' })
  birthDate: string;

  @ApiProperty({ example: 'male', description: '성별' })
  gender: string;

  @ApiProperty({ example: 'member', description: '사용자 권한' })
  role: string;
}
