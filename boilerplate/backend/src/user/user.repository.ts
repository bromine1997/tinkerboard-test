// user.repository.ts
import { Injectable, Inject } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { USER_COLLECTION } from '../database/database.constants';

export interface IUser {
  _id: ObjectId;
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

  // 특정 사용자 조회 by ObjectId
  async findUserById(id: ObjectId): Promise<IUser | null> {
    return await this.col.findOne({ _id: id });
  }

  // 사용자 정보 업데이트 (자신의 정보만 업데이트)
  async updateUserById(id: ObjectId, updateData: Partial<IUser>): Promise<boolean> {
    const result = await this.col.updateOne({ _id: id }, { $set: updateData });
    return result.acknowledged;
  }

  // 사용자 삭제
  async deleteUserById(id: ObjectId): Promise<boolean> {
    const result = await this.col.deleteOne({ _id: id });
    return result.acknowledged;
  }
}
