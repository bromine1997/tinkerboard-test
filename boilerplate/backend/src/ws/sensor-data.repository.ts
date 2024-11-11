// src/modules/sensor/repositories/sensor-data.repository.ts
import { Injectable, Inject } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { SENSOR_DATA_COLLECTION } from '../database/database.constants';

export interface ISensorData {
  pressure: number;
  temperature: number;
  humidity: number;
  oxygen: number;
  co2: number;
  flowRate: number;
}

export interface ISensorDataPacket {
  _id?: ObjectId;
  sensorData: ISensorData;
  elapsedTime: number;
  setPoint: number;
  timestamp: Date;
}

@Injectable()
export class SensorDataRepository {
  constructor(
    @Inject(SENSOR_DATA_COLLECTION) private readonly col: Collection<ISensorDataPacket>,
  ) {}

  async insertSensorData(packet: ISensorDataPacket): Promise<{ acknowledged: boolean; insertedId: string }> {
    const result = await this.col.insertOne(packet);
    return { acknowledged: result.acknowledged, insertedId: result.insertedId.toHexString() };
  }

  // 필요한 경우 추가 메서드 작성 (예: 데이터 조회 등)
}
