
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class ProfileSectionDto {
  @ApiProperty({ example: 1, description: '구간 번호' })
  @IsNumber()
  sectionNumber: number;

  @ApiProperty({ example: 0.0, description: '시작 압력 (ATA)' })
  @IsNumber()
  startPressure: number;

  @ApiProperty({ example: 2.0, description: '종료 압력 (ATA)' })
  @IsNumber()
  endPressure: number;

  @ApiProperty({ example: 10, description: '구간 지속 시간 (분)' })
  @IsNumber()
  duration: number;
}

export class CreateProfileDto {
  @ApiProperty({ example: 'High Pressure Protocol', description: '프로파일 이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: [ProfileSectionDto], description: '프로파일 섹션 목록' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProfileSectionDto)
  profileSections: ProfileSectionDto[];
}