import { Injectable, Inject } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { USER_COLLECTION } from '../database/database.constants'; // 상수로 정의된 사용자 컬렉션


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
      @Inject(USER_COLLECTION) private readonly col: Collection<IUser>,
    ) {}
  
    // 모든 사용자 조회
    async findAllUsers(): Promise<IUser[]> {
      const users = await this.col.find({}).toArray();
      return users;
    }
  
    // 특정 사용자 조회
    async findUserById(id: string): Promise<IUser | null> {
      if (!ObjectId.isValid(id)) {
        return null;
      }
      return await this.col.findOne({ _id: new ObjectId(id) });
    }
  
    // 사용자 정보 업데이트
    async updateUser(id: string, updateData: Partial<IUser>): Promise<boolean> {
      if (!ObjectId.isValid(id)) {
        throw new Error('Invalid ObjectId');
      }
      const result = await this.col.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData },
      );
      return result.acknowledged;
    }
  
    // 사용자 삭제
    async deleteUser(id: string): Promise<boolean> {
      if (!ObjectId.isValid(id)) {
        throw new Error('Invalid ObjectId');
      }
      const result = await this.col.deleteOne({ _id: new ObjectId(id) });
      return result.acknowledged;
    }
  }