<!-- Profile.vue -->
<template>
  <div class="row">
    <div class="col-md-8">
      <edit-profile-form :model="model"> </edit-profile-form>
    </div>
    <div class="col-md-4">
      <user-card :user="user"></user-card>
    </div>
  </div>
</template>

<script>
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
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: '',
        about: '',
      },
      user: {
        fullName: '',
        title: '',
        description: '',
      },
    };
  },
  created() {
    this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      try {
        const response = await this.$http.get('/user/profile');
        const userData = response.data;

        // 필요한 데이터로 모델 업데이트
        this.model.email = userData.email;
        this.model.username = userData.username;
        this.model.firstName = userData.firstName || '';
        this.model.lastName = userData.lastName || '';
        this.model.address = userData.address || '';
        this.model.city = userData.city || '';
        this.model.country = userData.country || '';
        this.model.about = userData.about || '';

        this.user.fullName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();
        this.user.title = userData.role || '';
        this.user.description = userData.about || '';
      } catch (error) {
        console.error('사용자 정보를 가져오는데 실패했습니다.', error);
        // 오류 처리 (예: 로그인 페이지로 리다이렉트)
      }
    },
  },
};
</script>

<style>
/* 스타일은 기존 그대로 유지 */
</style>
