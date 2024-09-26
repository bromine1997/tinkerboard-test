import { Injectable, Inject } from '@nestjs/common';
import { Collection } from 'mongodb';
import { USER_COLLECTION } from '../database/database.constants'; // MongoDB 컬렉션 상수

export interface IUser {
    _id?: string;           // MongoDB에서 자동으로 생성될 ID
    username: string;       // 사용자 아이디
    password: string;       // 해시된 비밀번호
    email: string;          // 이메일 주소
    phone?: string;         // 전화번호 (선택적)
    birthDate: string;      // 생년월일
    gender: string;         // 성별
    role: string;           // 권한 (admin, member 등)
  }
  

@Injectable()
export class AuthRepository {
  constructor(
    @Inject(USER_COLLECTION) private readonly col: Collection<IUser>, // MongoDB 컬렉션 주입
  ) {}

  // 사용자 아이디로 사용자 찾기
  async findByUsername(username: string): Promise<IUser | null> {
    return this.col.findOne({ username });
  }

  // 새 사용자 삽입
  async insertUser(user: IUser): Promise<{ acknowledged: boolean; insertedId: string }> {
    const result = await this .col.insertOne(user);
    return { acknowledged: result.acknowledged, insertedId: result.insertedId };
  }
}
