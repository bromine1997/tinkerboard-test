<template>
  <div class="row">
    <div class="col-md-8">
      <edit-profile-form :model="model" @update-profile="updateUserProfile"></edit-profile-form>
    </div>
    <div class="col-md-4">
      <user-card :user="user"></user-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';
import EditProfileForm from './Profile/EditProfileForm';
import UserCard from './Profile/UserCard';

export default {
  components: {
    EditProfileForm,
    UserCard,
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
      user: {},
      userId: '',
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
        // 토큰에서 userId 추출
        const token = localStorage.getItem('token');
        if (!token) {
          alert('로그인이 필요합니다.');
          this.$router.push('/login');
          return;
        }

        const decoded = VueJwtDecode.decode(token);
        this.userId = decoded.sub;

        if (!this.userId) {
          console.error('사용자 ID가 없습니다.');
          return;
        }

        console.log('Token:', token);
        console.log('Decoded userId:', this.userId);

        // 사용자 프로필 가져오기
        await this.fetchUserProfile();
      } catch (error) {
        alert('프로필 초기화 중 오류가 발생했습니다.');
        console.error(error);
      }
    },
    /**
     * 사용자 프로필 데이터 가져오기
     */
    async fetchUserProfile() {
      try {
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

          // 사용자 카드 데이터 업데이트
          this.user = { ...this.model };
          console.log('User data fetched successfully:', this.user);
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
