import { IsString, IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '아이디는 필수 입력 사항입니다.' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: '비밀번호는 필수 입력 사항입니다.' })
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  @IsString()
  password: string;

  @IsNotEmpty({ message: '이름은 필수 입력 사항입니다.' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: '이메일은 필수 입력 사항입니다.' })
  @IsEmail({}, { message: '유효한 이메일을 입력해주세요.' })
  email: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: '유효한 이메일을 입력해주세요.' })
  email?: string;
}
