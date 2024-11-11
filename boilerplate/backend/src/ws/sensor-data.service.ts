// src/modules/sensor/services/sensor-data.service.ts
import { Injectable } from '@nestjs/common';
import { SensorDataRepository, ISensorDataPacket } from './sensor-data.repository';
import { SensorDataPacketDto } from './sensor-data.dto';

@Injectable()
export class SensorDataService {
  constructor(private readonly sensorDataRepository: SensorDataRepository) {}

  async saveSensorData(
    sensorDataPacketDto: SensorDataPacketDto,
  ): Promise<{ message: string; sensorDataId: string }> {
    const { deviceId, runId, sensorData, elapsedTime, setPoint } = sensorDataPacketDto;

    const packetData: ISensorDataPacket = {
      deviceId,
      runId, // 선택 사항: runId가 있을 경우 포함
      sensorData,
      elapsedTime,
      setPoint,
      timestamp: new Date(),
      metadata: {
        deviceId,
        ...(runId && { runId }), // runId가 있을 경우 metadata에 포함
      },
    };

    const result = await this.sensorDataRepository.insertSensorData(packetData);
    if (result.acknowledged) {
      return { message: '센서 데이터 저장 성공', sensorDataId: result.insertedId };
    } else {
      throw new Error('센서 데이터 저장 실패');
    }
  }
}
