<!-- Profile.vue -->
<template>
  <div class="profile-container">
    <div class="row">
      <div class="col-md-8">
        <div v-if="userProfileStore.loading" class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">Loading profile...</p>
        </div>
        <div v-else-if="userProfileStore.profile" class="profile-content">
          <h2 class="profile-title">사용자 프로필</h2>
          <div class="profile-card">
            <edit-profile-form
              :model="userProfileStore.profile"
              @update-profile="userProfileStore.updateUserProfile"
            ></edit-profile-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditProfileForm from './Profile/EditProfileForm';
import { useUserProfileStore } from '@/store/userProfile';

export default {
  name: 'Profile',
  components: {
    EditProfileForm,
  },
  setup() {
    const userProfileStore = useUserProfileStore();
    userProfileStore.initializeUserProfile();
    
    return {
      userProfileStore,
    };
  },
};
</script>

<style scoped>
.profile-container {
  padding: 3rem;  /* 2rem에서 증가 */
  min-height: calc(100vh - 200px);
}

.profile-title {
  font-size: 2.5rem;  /* 2rem에서 증가 */
  color: #ffffff;
  margin-bottom: 2.5rem;  /* 2rem에서 증가 */
  font-weight: 600;
}

.profile-card {
  background: linear-gradient(145deg, #2a2d3e, #1f2235);
  border-radius: 20px;  /* 16px에서 증가 */
  padding: 2.5rem;  /* 2rem에서 증가 */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.loading-spinner {
  width: 60px;  /* 50px에서 증가 */
  height: 60px;  /* 50px에서 증가 */
  border: 4px solid rgba(255, 255, 255, 0.1);  /* 3px에서 증가 */
  border-radius: 50%;
  border-top-color: #6c5dd3;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1.5rem;  /* 1rem에서 증가 */
}

.loading-text {
  color: #8a8d98;
  font-size: 1.3rem;  /* 1.1rem에서 증가 */
  font-weight: 500;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Form 내부 요소들의 기본 폰트 크기 증가 */
:deep(.form-group) {
  margin-bottom: 1.5rem;  /* 폼 그룹 간격 증가 */
}

:deep(.form-label) {
  font-size: 1.2rem;  /* 라벨 폰트 크기 */
  margin-bottom: 0.75rem;
}

:deep(.form-control) {
  font-size: 1.2rem;  /* 입력 필드 폰트 크기 */
  padding: 0.75rem 1rem;
}

:deep(.btn) {
  font-size: 1.2rem;  /* 버튼 폰트 크기 */
  padding: 0.75rem 1.5rem;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .profile-container {
    padding: 1.5rem;  /* 1rem에서 증가 */
  }

  .profile-title {
    font-size: 2rem;  /* 1.5rem에서 증가 */
    margin-bottom: 2rem;
  }

  .profile-card {
    padding: 2rem;  /* 1.5rem에서 증가 */
  }
  
  :deep(.form-control) {
    font-size: 1.1rem;  /* 모바일에서의 입력 필드 폰트 크기 */
  }
}

/* 다크 테마에 최적화된 스크롤바 */
.profile-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05);
}

.profile-container::-webkit-scrollbar {
  width: 10px;  /* 8px에서 증가 */
}

.profile-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
}

.profile-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}

.profile-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  color: #8a8d98;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
}

.form-input {
  width: 100%;
  height: auto;
  padding: 1rem 1.25rem;  /* 상하 패딩 증가 */
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 1.1rem;
  line-height: 1.5;  /* 라인 하이트 추가 */
}

.form-input:focus {
  outline: none;
  border-color: #6c5dd3;
  box-shadow: 0 0 0 2px rgba(108, 93, 211, 0.2);
}

.form-select {
  width: 100%;
  height: auto;
  padding: 1rem 1.25rem;  /* 상하 패딩 증가 */
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 1.1rem;
  line-height: 1.5;  /* 라인 하이트 추가 */
  cursor: pointer;
  appearance: none;
}

.form-select:focus {
  outline: none;
  border-color: #6c5dd3;
  box-shadow: 0 0 0 2px rgba(108, 93, 211, 0.2);
}

/* 날짜 입력 필드 특별 스타일 */
input[type="date"] {
  min-height: 3.5rem;  /* 날짜 입력 필드 높이 확보 */
  padding: 0.5rem 1.25rem;  /* 상하 패딩 조정 */
}

/* 모바일 대응 */
@media (max-width: 768px) {
  .form-input,
  .form-select {
    padding: 0.875rem 1rem;  /* 모바일에서는 패딩 약간 줄임 */
    font-size: 1rem;
  }
}
</style>