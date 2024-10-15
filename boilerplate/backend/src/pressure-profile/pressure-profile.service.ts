import { Injectable } from '@nestjs/common';
import { PressureProfileRepository, IPressureProfile } from './pressure-profile.repository';
import { CreateProfileDto } from './create-profile.dto';
import { NotFoundException } from '@nestjs/common';

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

  async getProfileById(id: string) {
    return this.profileRepository.findById(id);
  }

  async getLatestProfile() {
    const profile = await this.profileRepository.findLatestProfile();
    if (!profile) {
      throw new NotFoundException('프로파일을 찾을 수 없습니다.');
    }
    return profile;
  }
  // 필요한 경우 추가 메서드 작성 (예: 프로파일 조회 등)
}
