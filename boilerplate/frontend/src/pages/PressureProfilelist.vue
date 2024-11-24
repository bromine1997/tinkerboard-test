<template>
  <div class="pressure-profiles">
    <h1>압력 프로파일 목록</h1>

    <div v-if="store.loading">로딩 중...</div>
    <div v-if="store.error">에러 발생: {{ store.error.message }}</div>

    <div v-if="!store.loading && !store.error">
      <div v-if="store.profiles.length === 0">저장된 프로파일이 없습니다.</div>
      <div v-else>
        <div v-for="profile in store.profiles" :key="profile._id" class="profile-card">
          <div class="profile-info">
            <h2>{{ profile.name }}</h2>
            <p>생성 날짜: {{ formatDate(profile.createdAt) }}</p>
            <p>생성자 ID: {{ profile.createdBy }}</p>
          </div>
          <ProfileChart :profileSections="profile.profileSections" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { usePressureProfileStore } from '@/stores/pressureProfile';
import ProfileChart from './ProfileChart.vue'; // ECharts 기반 컴포넌트

export default {
  name: 'PressureProfile',
  components: {
    ProfileChart,
  },
  setup() {
    const store = usePressureProfileStore();

    onMounted(() => {
      store.fetchProfiles();
    });

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleString();
    };

    return {
      store,
      formatDate,
    };
  },
};
</script>

<style scoped>
.pressure-profiles {
  padding: 20px;
}

.profile-card {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.profile-info {
  margin-bottom: 10px;
}

@media (min-width: 768px) {
  .profile-card {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .profile-info {
    flex: 1;
    margin-right: 20px;
  }

  .profile-chart {
    flex: 2;
  }
}
</style>
