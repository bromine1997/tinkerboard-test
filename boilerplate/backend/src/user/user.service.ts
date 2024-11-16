import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './update-user.dto';
import { IUser } from './user.repository';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // 특정 사용자 조회
  async findById(userId: ObjectId): Promise<IUser> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    return user;
  }

  // 사용자 정보 수정
  async updateUser(userId: ObjectId, updateUserDto: UpdateUserDto): Promise<IUser> {
    const user = await this.findById(userId); // 본인의 정보만 업데이트 가능
    await this.userRepository.updateUserById(userId, updateUserDto);
    return { ...user, ...updateUserDto }; // 수정된 데이터 반환
  }

  // 사용자 삭제
  async deleteUser(userId: ObjectId): Promise<void> {
    await this.findById(userId); // 본인의 정보만 삭제 가능
    await this.userRepository.deleteUserById(userId);
  }
}
