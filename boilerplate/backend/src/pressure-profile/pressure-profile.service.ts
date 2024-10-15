// src/pressure-profile/pressure-profile.service.ts

import { Injectable } from '@nestjs/common';
import { PressureProfileRepository, IPressureProfile } from './pressure-profile.repository';
import { CreateProfileDto } from './create-profile.dto';

@Injectable()
export class PressureProfileService {
  constructor(private readonly profileRepository: PressureProfileRepository) {}

  async saveProfile(createProfileDto: CreateProfileDto): Promise<{ message: string; profileId: string }> {
    const profileData: IPressureProfile = {
      profileSections: createProfileDto.profileSections,
      createdAt: new Date(),
    };

    const result = await this.profileRepository.insertProfile(profileData);
    if (result.acknowledged) {
      return { message: '프로파일 저장 성공', profileId: result.insertedId };
    } else {
      throw new Error('프로파일 저장 실패');
    }
  }

  // 필요한 경우 추가 메서드 작성 (예: 프로파일 조회 등)
}
