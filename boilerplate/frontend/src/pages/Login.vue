<template>
  <div id="login-test">
    <div class="title-container">
      <h1 class="web-title">IOT CHAMBER</h1>
    </div>
    <div id="login-container">
      <div id="login-card">
        <h2>로그인</h2>
        <label for="username">아이디:</label>
        <input v-model="user.username" id="username" type="text" placeholder="아이디" />
        
        <label for="password">비밀번호:</label>
        <input v-model="user.password" id="password" type="password" placeholder="비밀번호" />
        
        <button @click="login">로그인</button>
        <button @click="goToSignUp" class="signup-link">회원가입</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'; // Vue 3의 ref 사용
import axios from 'axios'; // Axios 사용
import jwtDecode from 'jwt-decode'; // VueJwtDecode 대신 jwt-decode 사용

export default {
  setup() {
    // 상태 관리
    const user = ref({
      username: '',
      password: '',
    });

    // 로그인 메서드
    const login = async () => {
      try {
        // 관리자 계정 확인 로직
        if (user.value.username === 'admin' && user.value.password === '1234') {
          alert('관리자 로그인 성공');
          window.location.href = '/dashboard'; // 대시보드로 이동
          return;
        }

        // 서버에 로그인 요청
        const response = await axios.post('/auth/login', {
          username: user.value.username,
          password: user.value.password,
        });

        // 로그인 성공 처리
        if (response.data.access_token) {
          alert('로그인 성공');

          // JWT 토큰 저장
          const token = response.data.access_token;
          localStorage.setItem('token', token);

          // 토큰 디코딩
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.sub || decodedToken.userId || decodedToken.id || decodedToken._id;

          if (userId) {
            localStorage.setItem('userId', userId);
            console.log('User ID:', userId);
          } else {
            console.error('토큰에서 사용자 ID를 추출하지 못했습니다.');
          }

          // 대시보드로 이동
          window.location.href = '/dashboard';
        } else {
          alert('로그인 실패, 다시 시도하세요.');
        }
      } catch (error) {
        alert('오류가 발생했습니다.');
        console.error(error);
      }
    };

    // 회원가입 페이지로 이동
    const goToSignUp = () => {
      window.location.href = '/signup';
    };

    return {
      user,
      login,
      goToSignUp,
    };
  },
};
</script>

<style scoped>
/* 기존 스타일 그대로 유지 */
#login-test {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #1a1a1a; /* 어두운 배경색 */
  position: relative;
}

.title-container {
  margin-top: 20px; /* 타이틀과 로그인 창 사이의 거리 */
}

.web-title {
  margin-top: 50px; /* 타이틀을 아래로 이동시키는 마진 */
  color: #ffffff; /* 웹 타이틀 텍스트 색상 */
  font-size: 28px; /* 웹 타이틀 폰트 크기 */
}

#login-container {
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1a1a1a; /* 어두운 배경색 */
}

#login-card {
  max-width: 350px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background-color: #2a2a2a; /* 어두운 카드 배경색 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #ffffff; /* 텍스트 색상 흰색 */
}

label {
  display: block;
  text-align: left;
  margin-bottom: 5px;
  font-weight: bold;
  color: #bbbbbb; /* 텍스트 색상 연한 회색 */
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #444444; /* 어두운 테두리 */
  border-radius: 5px;
  background-color: #333333; /* 어두운 입력 필드 배경색 */
  color: #ffffff; /* 입력 텍스트 색상 */
  transition: border-color 0.2s ease-in-out;
}

input:focus {
  border-color: #007bff; /* 포커스 시 테두리 색상 */
  outline: none;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #007bff; /* 버튼 배경색 파란색 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s ease-in-out;
}

button:hover {
  background-color: #0056b3; /* 버튼 호버 시 색상 */
}

.signup-link {
  width: 100%;
  padding: 12px;
  background-color: #007bff; /* 회원가입 버튼 배경색을 파란색으로 */
  color: white; /* 글자 색상을 흰색으로 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px; /* 여백 추가 */
  text-align: center;
  text-decoration: none;
  display: block; /* 버튼처럼 보이도록 display block 설정 */
  transition: background-color 0.2s ease-in-out;
}

.signup-link:hover {
  background-color: #0056b3; /* 회원가입 버튼 호버 시 색상 */
}
</style>
