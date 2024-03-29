import { Inject, Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';
import { TEST_COLLECTION } from 'src/database/database.constants';

export interface ISampleDataDoc {
  _id: string;
  name: string;
  age: number;
}

@Injectable()
export class TestRepository {
  constructor(@Inject(TEST_COLLECTION) private readonly col: Collection<ISampleDataDoc>) {}

  async find() {
    const cursor = this.col.find({});
    const dataList = await cursor.toArray();
    await cursor.close();

    return dataList;
  }

  async findOne(_id: string) {
    return this.col.findOne({ _id });
  }

  async insert(doc: ISampleDataDoc): Promise<{ acknowledged: boolean; insertedId: string }> {
    const { acknowledged, insertedId } = await this.col.insertOne(doc);
    return { acknowledged, insertedId };
  }

  async update(doc: ISampleDataDoc): Promise<boolean> {
    const { acknowledged } = await this.col.updateOne({ _id: doc._id }, doc, { upsert: true });
    return acknowledged;
  }

  async delete(_id: string): Promise<boolean> {
    const { acknowledged } = await this.col.deleteOne({ _id });
    return acknowledged;
  }
}
