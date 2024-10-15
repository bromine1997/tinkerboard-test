// src/pressure-profile/pressure-profile.repository.ts

import { Injectable, Inject } from '@nestjs/common';
import { Collection } from 'mongodb';
import { PROFILE_COLLECTION } from '../database/database.constants';

export interface IProfileSection {
  sectionNumber: number;
  startPressure: number;
  endPressure: number;
  time: number;
}

export interface IPressureProfile {
  _id?: string;
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
    return { acknowledged: result.acknowledged, insertedId: result.insertedId.toString() };

  }

  // 필요한 경우 추가 메서드 작성 (예: 프로파일 조회 등)
}
