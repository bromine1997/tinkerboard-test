import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  // 모든 사용자 조회
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // 특정 사용자 조회
  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    return user;
  }

  // 사용자 생성
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // 중복된 사용자 확인
    const existingUser = await this.findByUsername(createUserDto.username);
    if (existingUser) {
      throw new BadRequestException('이미 사용 중인 아이디입니다.');
    }

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  // 사용자 업데이트
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    return updatedUser;
  }

  // 사용자 삭제
  async deleteUser(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    return deletedUser;
  }

  // 사용자명으로 사용자 찾기 (로그인 시 사용)
  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }
}
