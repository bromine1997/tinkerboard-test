import { ApiProperty } from '@nestjs/swagger';

export class SearchSampleDataQuery {
  @ApiProperty({
    type: 'string',
    example: 'test123',
    description: 'id',
    required: true,
  })
  _id: string;
}

export class AddDataBody {
  @ApiProperty({
    type: 'string',
    example: 'test123',
    description: 'id',
    required: true,
  })
  _id: string;
  @ApiProperty({
    type: 'string',
    example: '홍길동',
    description: '이름',
    required: true,
  })
  name: string;
  @ApiProperty({
    type: 'number',
    example: '30',
    description: '나이',
    required: true,
  })
  age: number;
}

export class UpdateDataBody {
  @ApiProperty({
    type: 'string',
    example: 'test123',
    description: 'id',
    required: true,
  })
  _id: string;
  @ApiProperty({
    type: 'string',
    example: '홍길동',
    description: '이름',
    required: true,
  })
  name: string;
  @ApiProperty({
    type: 'number',
    example: '30',
    description: '나이',
    required: true,
  })
  age: number;
}
