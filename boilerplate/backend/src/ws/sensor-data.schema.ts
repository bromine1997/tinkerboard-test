// sensor-data.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class SensorData {
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
}

@Schema()
export class SensorDataPacket extends Document {
  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: false })
  runId?: string; // 실행 식별자 추가

  @Prop({ type: Object, required: true })
  sensorData: SensorData;

  @Prop({ required: true })
  elapsedTime: number;

  @Prop({ required: true })
  setPoint: number;

  @Prop({ required: true })
  timestamp: Date; // timeField로 사용할 필드

  @Prop({ type: Object, required: true })
  metadata: any; // metaField로 사용할 필드
}

export const SensorDataPacketSchema = SchemaFactory.createForClass(SensorDataPacket);
