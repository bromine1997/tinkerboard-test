<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title">
        <div class="table-responsive">
          <base-table :data="table1.data" :columns="table1.columns" thead-classes="text-primary"></base-table>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import { BaseTable } from '@/components';

// 테이블 컬럼 정의
const tableColumns = ['Name', 'Country', 'City', 'Day'];

// 원본 데이터 정의
const tableData = [
  {
    id: 1,
    name: 'Seo bo min',
    day: '2024-09-10',
    country: 'Korea',
    city: 'Yong-in',
  },
  {
    id: 2,
    name: 'Bromine',
    day: '2024-09-10',
    country: 'USA',
    city: 'Newyork',
  },
  {
    id: 3,
    name: 'Kim Ji WOO',
    day: '2024-09-24',
    country: 'Korea',
    city: 'Busan',
  },
  {
    id: 4,
    name: 'Jung Ji Hoon',
    day: '2024-09-09',
    country: 'Korea',
    city: 'Suwon',
  },
  {
    id: 5,
    name: 'JEONG WOONG',
    day: '2024-06-04',
    country: 'Korea',
    city: 'Suwon',
  },
  {
    id: 6,
    name: 'KOO MIN JUN',
    day: '2024-09-12',
    country: 'Korea',
    city: 'Suwon',
  },
];

export default {
  components: {
    BaseTable,
  },
  data() {
    return {
      table1: {
        title: 'Treatment Record',
        columns: [...tableColumns],
        // 날짜 기준으로 정렬된 데이터를 사용
        data: [...tableData].sort((a, b) => new Date(b.day) - new Date(a.day)),
      },
    };
  },
};
</script>

<style></style>
