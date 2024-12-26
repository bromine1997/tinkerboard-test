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
          <h2 class="profile-title">Profile Settings</h2>
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
  padding: 2rem;
  min-height: calc(100vh - 200px);
}

.profile-title {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 2rem;
  font-weight: 600;
}

.profile-card {
  background: linear-gradient(145deg, #2a2d3e, #1f2235);
  border-radius: 16px;
  padding: 2rem;
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
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #6c5dd3;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

.loading-text {
  color: #8a8d98;
  font-size: 1.1rem;
  font-weight: 500;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .profile-container {
    padding: 1rem;
  }

  .profile-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .profile-card {
    padding: 1.5rem;
  }
}

/* 다크 테마에 최적화된 스크롤바 */
.profile-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05);
}

.profile-container::-webkit-scrollbar {
  width: 8px;
}

.profile-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.profile-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.profile-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>