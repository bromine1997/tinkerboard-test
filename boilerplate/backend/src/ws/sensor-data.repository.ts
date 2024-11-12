// src/modules/sensor/repositories/sensor-data.repository.ts
import { Injectable, Inject } from '@nestjs/common';
import { Collection, ObjectId, UpdateResult, UpdateOptions, Filter, UpdateFilter } from 'mongodb';
import { SENSOR_DATA_COLLECTION } from '../database/database.constants';

export interface ISensorData {
  pressure: number;
  temperature: number;
  humidity: number;
  oxygen: number;
  co2: number;
  flowRate: number;
  elapsedTime: number; // 추가
  setPoint: number;    // 추가
}

export interface ISensorDataPacket {
  _id?: ObjectId;
  deviceId: string;
  sessionId: string; // 추가된 필드
  userId: string; // userId 필드 추가
  sensorData: ISensorData[];
  startTime: Date;
  endTime: Date;
}

@Injectable()
export class SensorDataRepository {
  constructor(
    @Inject(SENSOR_DATA_COLLECTION) private readonly col: Collection<ISensorDataPacket>,
  ) {}

  /**
   * 센서 데이터를 데이터베이스에 즉시 저장하기 위한 updateOne 메서드 추가
   */
  async updateOne(
    filter: Filter<ISensorDataPacket>,
    update: UpdateFilter<ISensorDataPacket>,
    options?: UpdateOptions
  ): Promise<UpdateResult> {
    return await this.col.updateOne(filter, update, options);
  }

  /**
   * 2시간 버킷에 센서 데이터를 추가합니다.
   * 기존 버킷이 존재하면 데이터를 추가하고, 없으면 새로운 버킷을 생성합니다.
   */
  async addToBucket(
    packet: ISensorData,
    deviceId: string,
    startTime: Date,
    endTime: Date
  ): Promise<{ acknowledged: boolean; insertedId?: string }> {
    const result: UpdateResult = await this.col.updateOne(
      { deviceId, startTime, endTime },
      { $push: { sensorData: packet }, $set: { endTime } },
      { upsert: true }
    );

    if (result.upsertedCount > 0 && result.upsertedId) {
      return { acknowledged: true, insertedId: result.upsertedId.toHexString() };
    }

    return { acknowledged: true, insertedId: undefined };
  }

  /**
   * 일괄 삽입을 위한 bulkWrite 메서드 추가
   */
  async bulkWriteSensorData(bulkOps: any[]): Promise<void> {
    if (bulkOps.length > 0) {
      await this.col.bulkWrite(bulkOps);
    }
  }

  // 필요한 경우 추가 메서드 작성 (예: 데이터 조회 등)
}
