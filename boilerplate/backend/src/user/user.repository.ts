import { Injectable, Inject } from '@nestjs/common';
import { Collection } from 'mongodb';
import { USER_COLLECTION } from '../database/database.constants'; // 상수로 정의된 사용자 컬렉션


export interface IUser {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    birthDate: string;
    gender: string;
    role: string;
  }

@Injectable()
export class UserRepository {
  constructor(
    @Inject(USER_COLLECTION) private readonly col: Collection<IUser>, // MongoDB 컬렉션 주입
  ) {}

  // 모든 사용자 조회
  async findAllUsers(): Promise<IUser[]> {
    const users = await this.col.find({}).toArray();
    return users;
  }

  // 특정 사용자 조회
  async findUserById(id: string): Promise<IUser | null> {
    return await this.col.findOne({ _id: id });
  }

  // 사용자 정보 업데이트
  async updateUser(id: string, updateData: Partial<IUser>): Promise<boolean> {
    const result = await this.col.updateOne({ _id: id }, { $set: updateData });
    return result.acknowledged;
  }

  // 사용자 삭제
  async deleteUser(id: string): Promise<boolean> {
    const result = await this.col.deleteOne({ _id: id });
    return result.acknowledged;
  }
}
