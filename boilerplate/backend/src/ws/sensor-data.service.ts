// sensor-data.service.ts
import { Injectable } from '@nestjs/common';
import { SensorDataRepository, ISensorData } from './sensor-data.repository';
import { SensorDataPacketDto } from './sensor-data.dto';

@Injectable()
export class SensorDataService {
  constructor(private readonly sensorDataRepository: SensorDataRepository) {}

  /**
   * 센서 데이터를 데이터베이스에 즉시 저장합니다.
   */
  async saveSensorData(sensorDataPacketDto: SensorDataPacketDto): Promise<{ message: string; sensorDataId?: string }> {
    const currentTime = new Date();
    const bucketDuration = 2 * 60 * 60 * 1000; // 2시간을 밀리초로 환산
    const bucketStartTime = new Date(Math.floor(currentTime.getTime() / bucketDuration) * bucketDuration);
    const bucketEndTime = new Date(bucketStartTime.getTime() + bucketDuration);

    const elapsedTimeInSeconds = Math.floor(sensorDataPacketDto.elapsedTime / 1000);
    const FormatsetPoint = parseFloat((sensorDataPacketDto.setPoint / 1000).toFixed(3));

    const sensorData: ISensorData = {
      ...sensorDataPacketDto.sensorData,
      elapsedTime: elapsedTimeInSeconds, // 초 단위로 저장
      setPoint: FormatsetPoint,           // 소수점 3자리로 자르기
    };

    try {
      // 기존 버킷 문서를 업데이트하거나 없으면 새로 생성합니다.
      await this.sensorDataRepository.updateOne(
        { deviceId: sensorDataPacketDto.deviceId, 
          sessionId: sensorDataPacketDto.sessionId, 
          userId: sensorDataPacketDto.userId, // userId 필드
          startTime: bucketStartTime,
          endTime: bucketEndTime },
        {   
          $push: { sensorData: sensorData },
          $set: { endTime: bucketEndTime },
        },
        { upsert: true },
      );

      return { message: '센서 데이터가 데이터베이스에 저장되었습니다.' };
    } catch (error) {
      console.error('센서 데이터 저장 중 오류 발생:', error);
      throw error;
    }
  }

  // 필요한 경우 추가 메서드 작성 (예: 데이터 조회 등)

  private formatElapsedTime(elapsedTime: number): string {
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}
