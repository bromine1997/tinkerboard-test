// sensor-data.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SensorDataDto {
  @ApiProperty({ example: 1.0, description: '압력 값' })
  @IsNumber()
  @IsNotEmpty()
  pressure: number;

  @ApiProperty({ example: 25.0, description: '온도 값' })
  @IsNumber()
  @IsNotEmpty()
  temperature: number;

  @ApiProperty({ example: 50.0, description: '습도 값' })
  @IsNumber()
  @IsNotEmpty()
  humidity: number;

  @ApiProperty({ example: 21.0, description: '산소 값' })
  @IsNumber()
  @IsNotEmpty()
  oxygen: number;

  @ApiProperty({ example: 0.04, description: '이산화탄소 값' })
  @IsNumber()
  @IsNotEmpty()
  co2: number;

  @ApiProperty({ example: 1.5, description: '유량 값' })
  @IsNumber()
  @IsNotEmpty()
  flowRate: number;
}

export class SensorDataPacketDto {
  @ApiProperty({ description: '장비 식별자' })
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty({ description: '세션 식별자' }) // 추가된 부분
  @IsString()
  @IsNotEmpty()
  sessionId: string; // 추가된 필드

  @ApiProperty({ description: '센서 데이터' })
  @ValidateNested()
  @Type(() => SensorDataDto)
  sensorData: SensorDataDto;

  @ApiProperty({ example: 1000, description: '경과 시간 (밀리초)' })
  @IsNumber()
  @IsNotEmpty()
  elapsedTime: number; // 추가

  @ApiProperty({ example: 2.0, description: '설정 값' })
  @IsNumber()
  @IsNotEmpty()
  setPoint: number; // 추가
}
