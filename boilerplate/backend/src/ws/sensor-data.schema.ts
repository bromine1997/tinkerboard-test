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
  elapsedTime: number;

  @Prop({ required: true })
  setPoint: number;
}

export const SensorDataSchema = SchemaFactory.createForClass(SensorData);

@Schema()
export class SensorDataPacket extends Document {
  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true })
  sessionId: string; // sessionId 필드 추가

  @Prop({ type: [SensorDataSchema], required: true })
  sensorData: SensorData[];

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;
}

export const SensorDataPacketSchema = SchemaFactory.createForClass(SensorDataPacket);

// 인덱스 설정: deviceId, sessionId, startTime, endTime을 기준으로 인덱스 생성
SensorDataPacketSchema.index({ deviceId: 1, sessionId: 1, startTime: 1, endTime: 1 });
