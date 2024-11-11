// src/modules/sensor/services/sensor-data.service.ts
import { Injectable } from '@nestjs/common';
import { SensorDataRepository, ISensorDataPacket } from './sensor-data.repository';
import { SensorDataPacketDto } from './sensor-data.dto';

@Injectable()
export class SensorDataService {
  constructor(private readonly sensorDataRepository: SensorDataRepository) {}

  async saveSensorData(sensorDataPacketDto: SensorDataPacketDto): Promise<{ message: string; sensorDataId: string }> {
    const packetData: ISensorDataPacket = {
      sensorData: sensorDataPacketDto.sensorData,
      elapsedTime: sensorDataPacketDto.elapsedTime,
      setPoint: sensorDataPacketDto.setPoint,
      timestamp: new Date(),
    };

    const result = await this.sensorDataRepository.insertSensorData(packetData);
    if (result.acknowledged) {
      return { message: '센서 데이터 저장 성공', sensorDataId: result.insertedId };
    } else {
      throw new Error('센서 데이터 저장 실패');
    }
  }

  // 필요한 경우 추가 메서드 작성 (예: 데이터 조회 등)
}
