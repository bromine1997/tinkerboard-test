// src/stores/pressureProfile.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const usePressureProfileStore = defineStore('pressureProfile', {
  state: () => ({
    profiles: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchProfiles() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('/api/profile'); // 백엔드 API 엔드포인트
        this.profiles = response.data;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
  },
});
