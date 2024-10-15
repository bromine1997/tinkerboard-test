import { Injectable, Inject } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { PROFILE_COLLECTION } from '../database/database.constants';

export interface IProfileSection {
  sectionNumber: number;
  startPressure: number;
  endPressure: number;
  duration: number; // 구간 지속 시간 (분 단위로 변경)
}

export interface IPressureProfile {
  _id?: ObjectId; // ObjectId를 사용
  profileSections: IProfileSection[];
  createdAt: Date;
}

@Injectable()
export class PressureProfileRepository {
  constructor(
    @Inject(PROFILE_COLLECTION) private readonly col: Collection<IPressureProfile>,
  ) {}

  async insertProfile(profile: IPressureProfile): Promise<{ acknowledged: boolean; insertedId: string }> {
    const result = await this.col.insertOne(profile);
    return { acknowledged: result.acknowledged, insertedId: result.insertedId.toHexString() }; // ObjectId를 toHexString으로 변환
  }

  async findById(id: string): Promise<IPressureProfile | null> {
    // _id가 ObjectId이므로 변환 필요
    return this.col.findOne({ _id: new ObjectId(id) });
  }

  async findLatestProfile(): Promise<IPressureProfile | null> {
    return this.col.find().sort({ createdAt: -1 }).limit(1).next();
  }
  // 필요한 경우 추가 메서드 작성 (예: 프로파일 업데이트, 삭제 등)
}
