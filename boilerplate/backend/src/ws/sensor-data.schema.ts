// sensor-data.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SensorData extends Document {
  @Prop({ required: true })
  pressure: number;

  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  humidity: number;

  @Prop({ required: true })
  oxygen: number;

  @Prop({ required: true })
  co2: number;

  @Prop({ required: true })
  flowRate: number;

  @Prop({ required: true })
  elapsedTime: number; // elapsedTime 필드 추가

  @Prop({ required: true })
  setPoint: number; // setPoint 필드 추가
}

export const SensorDataSchema = SchemaFactory.createForClass(SensorData);

@Schema()
export class SensorDataPacket extends Document {
  @Prop({ required: true })
  deviceId: string;

  @Prop({ type: [SensorDataSchema], required: true })
  sensorData: SensorData[]; // sensorData를 배열로 변경

  @Prop({ required: true })
  startTime: Date; // 버킷의 시작 시간

  @Prop({ required: true })
  endTime: Date; // 버킷의 종료 시간
}

export const SensorDataPacketSchema = SchemaFactory.createForClass(SensorDataPacket);

// 인덱스 설정: deviceId와 startTime, endTime을 기준으로 인덱스 생성
SensorDataPacketSchema.index({ deviceId: 1, startTime: 1, endTime: 1 });
