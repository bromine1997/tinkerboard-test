// src/stores/pressureProfile.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const usePressureProfileStore = defineStore('pressureProfile', {
  state: () => ({
    latestProfile: null, // 최신 프로파일을 저장할 상태
    loading: false,      // 로딩 상태
    error: null,         // 에러 상태
  }),

  getters: {
    /**
     * 최신 프로파일을 반환하는 게터
     * @param {Object} state - 스토어의 상태
     * @returns {Object|null} - 최신 프로파일 또는 null
     */
    getLatestProfile: (state) => state.latestProfile,
  },

  actions: {
    /**
     * 최신 압력 프로파일을 가져오는 액션
     * 백엔드의 /profile/latest 엔드포인트를 호출하여 데이터를 가져옵니다.
     */
    async fetchLatestProfile() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('/profile/latest'); // 전역 axios 인스턴스 사용
        this.latestProfile = response.data;
      } catch (err) {
        // 에러가 있을 경우 에러 메시지를 저장
        this.error = err.response ? err.response.data : err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
