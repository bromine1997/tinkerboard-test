// src/pressure-profile/dto/create-profile.dto.ts

import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProfileSectionDto {
  @Type(() => Number)
  sectionNumber: number;

  @Type(() => Number)
  startPressure: number;

  @Type(() => Number)
  endPressure: number;

  @Type(() => Number)
  time: number;
}

export class CreateProfileDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProfileSectionDto)
  profileSections: ProfileSectionDto[];
}
