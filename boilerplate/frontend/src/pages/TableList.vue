<template>
  <div class="row">
    <div class="col-12">
      <card class="treatment-card">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="card-title">{{ table1.title }}</h3>
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
            thead-classes="text-white"
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
    duration: 180,
    chamberNumber: 'A1',
  },
  {
    patientId: 'P1002',
    patientName: '이영희',
    treatmentDate: '2024-09-11',
    treatmentTime: '10:30',
    duration: 180,
    chamberNumber: 'A1',
  },
  {
    patientId: 'P1003',
    patientName: '홍길동',
    treatmentDate: '2024-09-12',
    treatmentTime: '10:30',
    duration: 180,
    chamberNumber: 'A1',
  },
  {
    patientId: 'P1004',
    patientName: '서보민',
    treatmentDate: '2024-09-13',
    treatmentTime: '10:30',
    duration: 180,
    chamberNumber: 'A1',
  },
  {
    patientId: 'P1005',
    patientName: '정지훈',
    treatmentDate: '2024-09-14',
    treatmentTime: '10:30',
    duration: 180,
    chamberNumber: 'A1',
  },
  {
    patientId: 'P1006',
    patientName: '김지우',
    treatmentDate: '2024-09-15',
    treatmentTime: '10:30',
    duration: 180,
    chamberNumber: 'A1',
  },
  {
    patientId: 'P1007',
    patientName: '김연주',
    treatmentDate: '2024-09-16',
    treatmentTime: '10:30',
    duration: 180,
    chamberNumber: 'A1',
  },
  {
    patientId: 'P1008',
    patientName: '이영수',
    treatmentDate: '2024-09-17',
    treatmentTime: '10:30',
    duration: 180,
    chamberNumber: 'A1',
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
  background: #27293d;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  padding: 2rem;  /* 1.5rem에서 2rem으로 증가 */
}

.card-title {
  font-size: 2rem;  /* 1.5rem에서 2rem으로 증가 */
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.treatment-stats {
  display: flex;
  gap: 1.5rem;
}

.stats-item {
  font-size: 1.2rem;  /* 0.9rem에서 1.2rem으로 증가 */
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1.25rem;  /* 패딩 증가 */
  border-radius: 6px;
  display: flex;
  align-items: center;
}

.treatment-table {
  margin-top: 1.5rem;  /* 1rem에서 1.5rem으로 증가 */
}

:deep(.treatment-table thead th) {
  background-color: #1e1e2f;
  color: #ffffff !important;
  font-weight: 600;
  font-size: 1.2rem;  /* 0.875rem에서 1.2rem으로 증가 */
  padding: 1.25rem;   /* 1rem에서 1.25rem으로 증가 */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

:deep(.treatment-table tbody td) {
  padding: 1.25rem;   /* 1rem에서 1.25rem으로 증가 */
  font-size: 1.2rem;  /* 0.875rem에서 1.2rem으로 증가 */
  color: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  vertical-align: middle;
}

:deep(.treatment-table tbody tr:hover) {
  background-color: rgba(255, 255, 255, 0.05);
  transition: background-color 0.2s ease;
}

:deep(.treatment-table tbody tr:last-child td) {
  border-bottom: none;
}

.table-responsive {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05);
}

/* 스크롤바 스타일은 기존과 동일하게 유지 */
.table-responsive::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.table-responsive::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.table-responsive::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.table-responsive::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.table-responsive::-webkit-scrollbar-corner {
  background: transparent;
}
</style>