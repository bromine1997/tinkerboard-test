<template>
  <div class="row">
    <div class="col-12">
      <card class="treatment-card">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="card-title text-primary">{{ table1.title }}</h3>
          <div class="treatment-stats">
            <span class="stats-item">
              <i class="fas fa-users mr-2"></i>
              총 환자 수: {{ uniquePatients }} 명
            </span>
          </div>
        </div>
        <div class="table-responsive">
          <base-table
            :data="table1.data"
            :columns="table1.columns"
            thead-classes="text-primary"
            class="treatment-table"
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
    patientId: 'P1003',
    patientName: '홍길동',
    treatmentDate: '2024-09-11',
    treatmentTime: '10:30',
    duration: 45,
    chamberNumber: 'B2',
  },
  {
    patientId: 'P1004',
    patientName: '서보민',
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
  computed: {
    uniquePatients() {
      return new Set(this.table1.data.map(item => item.patientId)).size;
    }
  }
};
</script>

<style scoped>
.treatment-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #344767;
  margin: 0;
}

.treatment-stats {
  display: flex;
  gap: 1.5rem;
}

.stats-item {
  font-size: 0.9rem;
  color: #666;
  background: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
}

.treatment-table {
  margin-top: 1rem;
}

:deep(.treatment-table thead th) {
  background-color: #f8f9fa;
  color: #344767 !important;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 1rem;
  border-bottom: 2px solid #eee;
}

:deep(.treatment-table tbody td) {
  padding: 1rem;
  font-size: 0.875rem;
  color: #666;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
}

:deep(.treatment-table tbody tr:hover) {
  background-color: #f8f9fa;
  transition: background-color 0.2s ease;
}

:deep(.treatment-table tbody tr:last-child td) {
  border-bottom: none;
}
</style>