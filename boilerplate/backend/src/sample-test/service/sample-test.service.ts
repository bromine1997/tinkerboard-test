import { Injectable } from '@nestjs/common';
import { ContextLogger } from 'src/core/logger/context-logger.service';
import { ISampleDataDoc, TestRepository } from '../repository/test.repository';

@Injectable()
export class SampleTestService {
  constructor(
    private readonly logger: ContextLogger,
    private readonly testRepository: TestRepository
  ) {}

  async getDataList() {
    const dataList = await this.testRepository.find();
    this.logger.log(`getDataList results: ${JSON.stringify(dataList)}`);

    return { success: true, dataList };
  }

  async getData(_id: string) {
    const data = await this.testRepository.findOne(_id);
    this.logger.log(`getData result: ${JSON.stringify(data)}`);

    return data;
  }

  async addData(doc: ISampleDataDoc) {
    this.logger.log(`addData method's new doc: ${JSON.stringify(doc)}`);

    const result = await this.testRepository.insert(doc);
    return {
      sucess: result.acknowledged,
      insertedId: result.insertedId,
    };
  }

  async updateData(doc: ISampleDataDoc) {
    this.logger.log(`updateData method's new doc: ${JSON.stringify(doc)}`);

    const success = await this.testRepository.update(doc);
    return { success };
  }

  async deleteData(_id: string) {
    this.logger.log(`deleteData's doc id : ${_id}`);

    const success = await this.testRepository.delete(_id);
    return { success };
  }
}
