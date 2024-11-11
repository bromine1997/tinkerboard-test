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
}

export const SensorDataSchema = SchemaFactory.createForClass(SensorData);

@Schema()
export class SensorDataPacket extends Document {
  @Prop({ required: true })
  deviceId: string; // deviceId 필드 추가

  @Prop({ type: SensorDataSchema, required: true })
  sensorData: SensorData;

  @Prop({ required: true })
  elapsedTime: number;

  @Prop({ required: true })
  setPoint: number;

  @Prop({ default: Date.now })
  timestamp: Date;
}

