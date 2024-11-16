import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository'; // UserRepository는 DB와의 상호작용 담당
import { UpdateUserDto } from './update-user.dto'; // 업데이트 DTO
import { IUser } from './user.repository'; // IUser 인터페이스
import { Types } from 'mongoose'; // Mongoose의 Types 객체 임포트

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // 사용자 전체 조회
  async findAll(): Promise<IUser[]> {
    return this.userRepository.findAllUsers();
  }

 
// 특정 사용자 조회
async findById(id: string): Promise<IUser> {
  const user = await this.userRepository.findUserById(id);
  if (!user) {
    throw new NotFoundException('사용자를 찾을 수 없습니다.');
  }
  return user;
}

   // 사용자 정보 수정
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const user = await this.findById(id); // 이미 조회된 사용자를 활용
    await this.userRepository.updateUser(id, updateUserDto);
    return { ...user, ...updateUserDto }; // 수정된 데이터 반환
  }

   // 사용자 삭제
  async deleteUser(id: string): Promise<void> {
    const user = await this.findById(id); // 이미 조회된 사용자를 활용
    await this.userRepository.deleteUser(id);
  }
}
