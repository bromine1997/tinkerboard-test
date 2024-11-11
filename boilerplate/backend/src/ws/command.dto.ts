import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CommandDto {
  @ApiProperty({ example: 'START', description: '명령 액션' })
  @IsString()
  @IsNotEmpty()
  action: string;

  // 필요한 경우 추가 필드
}