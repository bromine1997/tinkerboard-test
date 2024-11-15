<!-- Profile.vue -->
<template>
  <div class="row">
    <div class="col-md-8">
      <edit-profile-form :model="model" @update-profile="updateUserProfile"> </edit-profile-form>
    </div>
    <div class="col-md-4">
      <user-card :user="user"></user-card>
    </div>
  </div>
</template>

<script>
import EditProfileForm from './Profile/EditProfileForm';
import UserCard from './Profile/UserCard';
import VueJwtDecode from 'vue-jwt-decode';

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
    this.extractUserIdFromToken();
    this.fetchUserProfile();
  },
  methods: {
    extractUserIdFromToken() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = VueJwtDecode.decode(token);
          this.userId = decoded.sub;
          if (!this.userId) {
            console.error('토큰에 사용자 ID가 포함되어 있지 않습니다.');
          }
        } catch (error) {
          console.error('토큰 디코딩 중 오류 발생:', error);
        }
      } else {
        console.error('로컬 스토리지에서 토큰을 찾을 수 없습니다.');
      }
    },
    async fetchUserProfile() {
      if (!this.userId) {
        return;
      }
      try {
        const response = await this.$http.get(`/users/${this.userId}`);
        const userData = response.data;

        // 모델 업데이트
        this.model.name = userData.name || '';
        this.model.email = userData.email || '';
        this.model.phone = userData.phone || '';
        this.model.birthDate = userData.birthDate || '';
        this.model.gender = userData.gender || '';

        // 사용자 카드에 표시할 정보 업데이트
        this.user = { ...this.model };
      } catch (error) {
        console.error('사용자 정보를 가져오는데 실패했습니다.', error);
        // 오류 처리 (예: 로그인 페이지로 리다이렉트)
      }
    },
    async updateUserProfile(updatedData) {
      try {
        await this.$http.put(`/users/${this.userId}`, updatedData);
        // 업데이트 성공 시 사용자 정보 갱신
        this.fetchUserProfile();
        alert('프로필이 성공적으로 업데이트되었습니다.');
      } catch (error) {
        console.error('프로필 업데이트 중 오류 발생:', error);
        // 오류 처리
      }
    },
  },
};
</script>

<style>
/* 필요한 스타일 추가 또는 기존 스타일 유지 */
</style>
