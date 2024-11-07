<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title">
        <div class="table-responsive">
          <base-table
            :data="table1.data"
            :columns="table1.columns"
            thead-classes="text-primary"
          ></base-table>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import { BaseTable } from '@/components';

const tableColumns = [
  { label: '환자 ID', field: 'patientId' },
  { label: '환자 이름', field: 'patientName' },
  { label: '치료 날짜', field: 'treatmentDate' },
  { label: '치료 시간', field: 'treatmentTime' },
  { label: '치료 시간(분)', field: 'duration' },
  { label: '챔버 번호', field: 'chamberNumber' },
];

const tableData = [
  {
    patientId: 'P1001',
    patientName: '김철수',
    treatmentDate: '2024-09-10',
    treatmentTime: '09:00',
    duration: 60,
    chamberNumber: 'A1',
  },
  {
    patientId: 'P1002',
    patientName: '이영희',
    treatmentDate: '2024-09-11',
    treatmentTime: '10:30',
    duration: 45,
    chamberNumber: 'B2',
  },
  {
    patientId: 'P1002',
    patientName: '이영희',
    treatmentDate: '2024-09-11',
    treatmentTime: '10:30',
    duration: 45,
    chamberNumber: 'B2',
  },
  {
    patientId: 'P1002',
    patientName: '이영희',
    treatmentDate: '2024-09-11',
    treatmentTime: '10:30',
    duration: 45,
    chamberNumber: 'B2',
  },
  {
    patientId: 'P1002',
    patientName: '이영희',
    treatmentDate: '2024-09-11',
    treatmentTime: '10:30',
    duration: 45,
    chamberNumber: 'B2',
  },
  {
    patientId: 'P1002',
    patientName: '이영희',
    treatmentDate: '2024-09-11',
    treatmentTime: '10:30',
    duration: 45,
    chamberNumber: 'B2',
  },
  {
    patientId: 'P1002',
    patientName: '이영희',
    treatmentDate: '2024-09-11',
    treatmentTime: '10:30',
    duration: 45,
    chamberNumber: 'B2',
  },
  {
    patientId: 'P1002',
    patientName: '이영희',
    treatmentDate: '2024-09-11',
    treatmentTime: '10:30',
    duration: 45,
    chamberNumber: 'B2',
  },
  // ... 추가 데이터
];

export default {
  components: {
    BaseTable,
  },
  data() {
    return {
      table1: {
        title: '치료 기록',
        columns: tableColumns,
        data: tableData.sort(
          (a, b) => new Date(b.treatmentDate) - new Date(a.treatmentDate)
        ),
      },
    };
  },
};
</script>
