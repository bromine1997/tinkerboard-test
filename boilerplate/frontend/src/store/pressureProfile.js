// src/stores/pressureProfile.js
import { defineStore } from 'pinia';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // 백엔드 API 기본 URL 설정
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const usePressureProfileStore = defineStore('pressureProfile', {
  state: () => ({
    profiles: [],
    loading: false,
    error: null,
  }),
  getters: {
    getProfileById: (state) => (id) => {
      return state.profiles.find(profile => profile._id === id);
    },
  },
  actions: {
    async fetchProfiles() {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiClient.get('/profile'); // 모든 프로파일 불러오기
        this.profiles = response.data;
      } catch (err) {
        this.error = err.response ? err.response.data : err.message;
      } finally {
        this.loading = false;
      }
    },

    async addProfile(newProfile) {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiClient.post('/profile/save', newProfile);
        if (response.data) {
          this.profiles.push(response.data.profile);
        }
      } catch (err) {
        this.error = err.response ? err.response.data : err.message;
      } finally {
        this.loading = false;
      }
    },

    async updateProfile(id, updatedProfile) {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiClient.put(`/profile/${id}`, updatedProfile);
        if (response.data) {
          const index = this.profiles.findIndex(profile => profile._id === id);
          if (index !== -1) {
            this.profiles[index] = response.data.profile;
          }
        }
      } catch (err) {
        this.error = err.response ? err.response.data : err.message;
      } finally {
        this.loading = false;
      }
    },

    async deleteProfile(id) {
      this.loading = true;
      this.error = null;
      try {
        await apiClient.delete(`/profile/${id}`);
        this.profiles = this.profiles.filter(profile => profile._id !== id);
      } catch (err) {
        this.error = err.response ? err.response.data : err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
