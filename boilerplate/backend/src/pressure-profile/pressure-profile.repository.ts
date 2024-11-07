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
  _id?: ObjectId;
  name: string;
  profileSections: IProfileSection[];
  createdAt: Date;
  createdBy: ObjectId; // 프로파일을 생성한 사용자 ID
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

  // 여기에서 profileModel을 col로 변경
  async findAllProfiles(): Promise<IPressureProfile[]> {
    return await this.col.find().toArray(); // 모든 프로파일을 가져오는 메서드
  }

  // 필요한 경우 추가 메서드 작성 (예: 프로파일 업데이트, 삭제 등)
}
