<!-- Profile.vue -->
<template>
  <div class="row">
    <div class="col-md-8">
      <div v-if="loading">
        <p>Loading...</p>
      </div>
      <div v-else>
        <edit-profile-form :model="model" @update-profile="updateUserProfile"></edit-profile-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import EditProfileForm from './Profile/EditProfileForm';

export default {
  name: 'Profile',
  components: {
    EditProfileForm,
  },
  data() {
    return {
      model: {
        name: '',
        email: '',
        phone: '',
        birthDate: '',
        gender: '',
      },
      userId: '',
      loading: true, // 로딩 상태 추가
    };
  },
  created() {
    this.initializeUserProfile();
  },
  methods: {
    /**
     * 사용자 프로필 초기화
     */
    async initializeUserProfile() {
      try {
        // 로컬 스토리지에서 userId 가져오기
        const userId = localStorage.getItem('userId');
        if (!userId) {
          alert('로그인이 필요합니다.');
          this.$router.push('/login');
          return;
        }

        this.userId = userId;

        // 사용자 프로필 가져오기
        await this.fetchUserProfile();
        this.$forceUpdate();
      } catch (error) {
        alert('프로필 초기화 중 오류가 발생했습니다.');
        console.error(error);
      } finally {
        this.loading = false; // 로딩 상태 종료
      }
    },
    /**
     * 사용자 프로필 데이터 가져오기
     */
    async fetchUserProfile() {
      try {
        // 상대 경로로 Axios 요청
        const response = await axios.get(`/users/${this.userId}`);
        const userData = response.data;

        if (userData) {
          // 모델 업데이트
          this.model = {
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            birthDate: userData.birthDate || '',
            gender: userData.gender || '',
          };

          console.log('User data fetched successfully:', this.model);
        } else {
          alert('사용자 정보를 가져오지 못했습니다.');
        }
      } catch (error) {
        alert('사용자 정보를 가져오는 중 오류가 발생했습니다.');
        console.error(error);
      }
    },
    /**
     * 사용자 프로필 업데이트
     */
    async updateUserProfile(updatedData) {
      try {
        // 상대 경로로 Axios 요청
        const response = await axios.put(`/users/${this.userId}`, updatedData);

        if (response.status === 200) {
          alert('프로필이 성공적으로 업데이트되었습니다.');
          await this.fetchUserProfile();
        } else {
          alert('프로필 업데이트에 실패했습니다.');
        }
      } catch (error) {
        alert('프로필 업데이트 중 오류가 발생했습니다.');
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
/* 필요한 스타일 추가 */
</style>
