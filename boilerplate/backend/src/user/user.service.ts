import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

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
    return this.userModel.findById(id).exec();
  }

  // 사용자 생성
  async createUser(userData: any): Promise<User> {
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }

  // 사용자 업데이트
  async updateUser(id: string, updateData: any): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  // 사용자 삭제
  async deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }  

  // 사용자명으로 사용자 찾기 (로그인 시 사용)
  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }
}
