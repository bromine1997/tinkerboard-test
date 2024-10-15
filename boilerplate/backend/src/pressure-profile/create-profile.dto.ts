import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProfileSectionDto {
  sectionNumber: number;
  startPressure: number;
  endPressure: number;
  duration: number; // 구간 지속 시간 (분 단위로 변경)
}

export class CreateProfileDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProfileSectionDto)
  profileSections: ProfileSectionDto[];
}
