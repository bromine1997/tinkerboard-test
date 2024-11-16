import { Injectable, Inject } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { USER_COLLECTION } from '../database/database.constants';

export interface IUser {
  _id?: ObjectId; // ObjectId 타입으로 수정
  username: string;
  password: string;
  email: string;
  phone?: string;
  birthDate: string;
  gender: string;
  role: string;
}

@Injectable()
export class AuthRepository {
  constructor(
    @Inject(USER_COLLECTION) private readonly col: Collection<IUser>,
  ) {}

  async findByUsername(username: string): Promise<IUser | null> {
    return this.col.findOne({ username });
  }

  async insertUser(user: IUser): Promise<{ acknowledged: boolean; insertedId: ObjectId }> {
    const result = await this.col.insertOne(user);
    return { acknowledged: result.acknowledged, insertedId: result.insertedId };
  }

  async findById(userId: string): Promise<IUser | null> {
    const objectId = new ObjectId(userId); // ObjectId로 변환
    return await this.col.findOne({ _id: objectId }); // _id가 ObjectId임을 명시
  }
}
