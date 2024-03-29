import { Body, Controller, Delete, Get, HttpCode, Post, Put, UseFilters } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiExceptionFilter } from '../../core/filter/api-exception.filter';
import { SampleTestService } from '../service/sample-test.service';
import { AddDataBody, UpdateDataBody } from './sample-test-v1.dto';

@ApiTags('샘플 데이터 V1 API')
@Controller('/v1/sample-test')
@UseFilters(ApiExceptionFilter)
export class SampleTestV1Controller {
  constructor(private readonly sampleTestService: SampleTestService) {}

  @ApiOperation({ summary: '샘플 데이터 조회' })
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'id',
          },
          name: {
            type: 'string',
            description: '이름',
          },
          age: {
            type: 'number',
            description: '나이',
          },
        },
      },
    },
  })
  @Get('sample')
  async getSampleList() {
    return this.sampleTestService.getDataList();
  }

  @ApiOperation({ summary: '샘플 데이터 추가' })
  @ApiOkResponse({
    schema: {
      type: 'obejct',
      properties: {
        success: {
          type: 'boolean',
          description: '성공여부',
          examples: [true, false],
        },
        insertedId: {
          type: 'string',
          description: '추가된 id',
          example: 'test123',
        },
      },
    },
  })
  @Post('sample')
  async addSampleData(@Body() body: AddDataBody) {
    return this.sampleTestService.addData(body);
  }

  @ApiOperation({ summary: '샘플 데이터 수정' })
  @ApiOkResponse({
    schema: {
      type: 'obejct',
      properties: {
        success: {
          type: 'boolean',
          description: '성공여부',
          examples: [true, false],
        },
      },
    },
  })
  @Put('sample')
  @HttpCode(200)
  async updateSampleData(@Body() body: UpdateDataBody) {
    return this.sampleTestService.updateData(body);
  }

  @ApiOperation({ summary: '샘플 데이터 삭제' })
  @ApiOkResponse({
    schema: {
      type: 'obejct',
      properties: {
        success: {
          type: 'boolean',
          description: '성공여부',
          examples: [true, false],
        },
      },
    },
  })
  @Delete('sample')
  async deleteSampleData(_id: string) {
    return this.sampleTestService.deleteData(_id);
  }
}
