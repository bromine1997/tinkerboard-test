import { IsEmail, IsNotEmpty, MinLength, IsDateString, IsEnum, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '아이디는 필수 입력 사항입니다.' })
  username: string;

  @IsNotEmpty({ message: '비밀번호는 필수 입력 사항입니다.' })
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  password: string;

  @IsNotEmpty({ message: '이름은 필수 입력 사항입니다.' })
  name: string;

  @IsPhoneNumber(null, { message: '올바른 전화번호 형식이 아닙니다.' })
  @IsNotEmpty({ message: '전화번호는 필수 입력 사항입니다.' })
  phone: string;

  @IsEmail({}, { message: '유효한 이메일 주소를 입력해주세요.' })
  @IsNotEmpty({ message: '이메일은 필수 입력 사항입니다.' })
  email: string;

  @IsDateString({}, { message: '유효한 생년월일 형식을 입력해주세요.' })
  @IsNotEmpty({ message: '생년월일은 필수 입력 사항입니다.' })
  birthdate: string;

  @IsEnum(['male', 'female'], { message: '성별을 선택해주세요.' })
  @IsNotEmpty({ message: '성별은 필수 선택 사항입니다.' })
  gender: string;

  @IsEnum(['member', 'admin', 'operator'], { message: '권한을 선택해주세요.' })
  @IsNotEmpty({ message: '권한은 필수 선택 사항입니다.' })
  role: string;
}
