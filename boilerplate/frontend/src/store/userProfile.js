// src/store/userProfile.js
import { defineStore } from 'pinia';
import axios from 'axios';
export const useUserProfileStore = defineStore('userProfile', {
    state: () => ({
      userId: '',
      profile: null,
      loading: false,
      isInitialized: false, // 프로필 데이터 로드 여부를 나타내는 변수 추가
    }),
    actions: {
      async initializeUserProfile() {
        if (this.isInitialized) {
          // 이미 프로필이 로드되어 있으면 서버 요청을 하지 않습니다.
          return;
        }
        this.loading = true;
        try {
          const userId = localStorage.getItem('userId');
          if (!userId) {
            alert('로그인이 필요합니다.');
            this.router.push('/login');
            return;
          }
          this.userId = userId;
          await this.fetchUserProfile();
          this.isInitialized = true; // 프로필 로드 완료
        } catch (error) {
          alert('프로필 초기화 중 오류가 발생했습니다.');
          console.error(error);
        } finally {
          this.loading = false;
        }
      },
      async fetchUserProfile() {
        try {
          const response = await axios.get(`/users/${this.userId}`);
          const userData = response.data;
  
          if (userData) {
            this.profile = {
              name: userData.name || '',
              email: userData.email || '',
              phone: userData.phone || '',
              birthDate: userData.birthDate || '',
              gender: userData.gender || '',
            };
            console.log('User data fetched successfully:', this.profile);
          } else {
            alert('사용자 정보를 가져오지 못했습니다.');
          }
        } catch (error) {
          alert('사용자 정보를 가져오는 중 오류가 발생했습니다.');
          console.error(error);
        }
      },
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
  });