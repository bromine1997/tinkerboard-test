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
/* 컨테이너 스타일 */
.profile-container {
  padding: 3rem;
  min-height: calc(100vh - 200px);
}

.profile-title {
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 2.5rem;
  font-weight: 600;
}

.profile-card {
  background: linear-gradient(145deg, #2a2d3e, #1f2235);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* 로딩 상태 스타일 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #6c5dd3;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1.5rem;
}

.loading-text {
  color: #8a8d98;
  font-size: 1.3rem;
  font-weight: 500;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 폼 스타일 */
:deep(.form-group) {
  margin-bottom: 2rem;
}

:deep(.form-label) {
  display: block;
  color: #8a8d98;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

:deep(.form-control),
:deep(.form-input),
:deep(.form-select) {
  width: 100%;
  min-height: 3.5rem;
  padding: 0.8rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 1.2rem;
  line-height: 1.8;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

:deep(.form-control:focus),
:deep(.form-input:focus),
:deep(.form-select:focus) {
  outline: none;
  border-color: #6c5dd3;
  box-shadow: 0 0 0 2px rgba(108, 93, 211, 0.2);
  background: rgba(255, 255, 255, 0.08);
}

:deep(.form-control::placeholder) {
  color: rgba(255, 255, 255, 0.3);
}

/* 특수 입력 필드 스타일 */
:deep(input[type="date"]) {
  min-height: 3.5rem;
  padding: 0.6rem 1.25rem;
  line-height: 2;
}

:deep(select.form-select) {
  padding-right: 2.5rem;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
}

/* 버튼 스타일 */
:deep(.btn) {
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .profile-container {
    padding: 1.5rem;
  }
  
  .profile-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .profile-card {
    padding: 1.5rem;
  }

  :deep(.form-control),
  :deep(.form-input),
  :deep(.form-select) {
    min-height: 3.2rem;
    padding: 0.7rem 1rem;
    font-size: 1.1rem;
  }

  :deep(.form-label) {
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
  }
}

/* 스크롤바 스타일 */
.profile-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05);
}

.profile-container::-webkit-scrollbar {
  width: 10px;
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
</style>