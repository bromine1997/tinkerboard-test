// sensor-data.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { SensorDataRepository, ISensorData } from './sensor-data.repository';
import { SensorDataPacketDto } from './sensor-data.dto';

@Injectable()
export class SensorDataService implements OnModuleDestroy {
  private buffer: { deviceId: string; sensorData: ISensorData; startTime: Date; endTime: Date }[] = [];
  private bufferTimer: NodeJS.Timeout;

  constructor(private readonly sensorDataRepository: SensorDataRepository) {
    // 1분마다 버퍼를 플러시하도록 타이머 설정
    this.bufferTimer = setInterval(() => {
      this.flushBuffer();
    }, 60 * 1000); // 1분
  }

  /**
   * 센서 데이터를 버퍼에 저장합니다.
   */
  async saveSensorData(sensorDataPacketDto: SensorDataPacketDto): Promise<{ message: string; sensorDataId?: string }> {
    const currentTime = new Date();
    const bucketDuration = 2 * 60 * 60 * 1000; // 2시간을 밀리초로 환산
    const bucketStartTime = new Date(Math.floor(currentTime.getTime() / bucketDuration) * bucketDuration);
    const bucketEndTime = new Date(bucketStartTime.getTime() + bucketDuration);

    const sensorData: ISensorData = {
      ...sensorDataPacketDto.sensorData,
      elapsedTime: sensorDataPacketDto.elapsedTime, // 수정됨
      setPoint: sensorDataPacketDto.setPoint,       // 수정됨
    };

    // 버퍼에 데이터 추가
    this.buffer.push({
      deviceId: sensorDataPacketDto.deviceId,
      sensorData,
      startTime: bucketStartTime,
      endTime: bucketEndTime,
    });

    return { message: '센서 데이터 버퍼에 저장됨', sensorDataId: '버퍼링됨' };
  }

  /**
   * 버퍼에 쌓인 데이터를 2시간 버킷에 일괄 저장합니다.
   */
  private async flushBuffer() {
    if (this.buffer.length === 0) return;

    const bufferCopy = [...this.buffer];
    this.buffer = [];

    // 버킷별로 데이터를 그룹화
    const bucketMap: { [key: string]: { deviceId: string; startTime: Date; endTime: Date; data: ISensorData[] } } = {};

    bufferCopy.forEach(packet => {
      const key = `${packet.deviceId}_${packet.startTime.getTime()}`;
      if (!bucketMap[key]) {
        bucketMap[key] = {
          deviceId: packet.deviceId,
          startTime: packet.startTime,
          endTime: packet.endTime,
          data: [],
        };
      }
      bucketMap[key].data.push(packet.sensorData);
    });

    // 각 버킷에 대해 bulkWrite 작업 생성
    const bulkOps = [];
    for (const key in bucketMap) {
      const bucket = bucketMap[key];
      bulkOps.push({
        updateOne: {
          filter: { deviceId: bucket.deviceId, startTime: bucket.startTime, endTime: bucket.endTime },
          update: { $push: { sensorData: { $each: bucket.data } }, $set: { endTime: bucket.endTime } },
          upsert: true,
        },
      });
    }

    try {
      await this.sensorDataRepository.bulkWriteSensorData(bulkOps);
      console.log('버킷 플러시 성공:', bulkOps.length, '개의 버킷 업데이트');
    } catch (error) {
      console.error('버킷 플러시 중 오류 발생:', error);
      // 필요시 재시도 로직 추가
    }
  }

  /**
   * 모듈이 종료될 때 버퍼를 플러시하고 타이머를 정리합니다.
   */
  onModuleDestroy() {
    clearInterval(this.bufferTimer);
    this.flushBuffer();
  }

  // 필요한 경우 추가 메서드 작성 (예: 데이터 조회 등)
}
