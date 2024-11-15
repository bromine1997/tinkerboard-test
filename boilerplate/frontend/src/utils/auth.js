// src/utils/auth.js
import VueJwtDecode from 'vue-jwt-decode';


export function getUserRole() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decoded = VueJwtDecode.decode(token);
      return decoded.role;
    } catch (e) {
      console.error('토큰 디코딩 실패', e);
      return null;
    }
  }