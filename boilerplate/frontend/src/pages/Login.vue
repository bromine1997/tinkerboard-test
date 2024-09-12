<template>
  <div id="login-test">
    <div class="title-container">
      <h1 class="web-title">IOT CHAMBER</h1>
    </div>
    <div id="login-container">
      <div id="login-card">
        <h2>로그인</h2>
        <label for="email">이메일:</label>
        <input v-model="user.email" id="email" type="email" placeholder="이메일" />
        <label for="password">비밀번호:</label>
        <input v-model="user.password" id="password" type="password" placeholder="비밀번호" />
        <button @click="login">로그인</button>
        <!-- 회원가입 버튼을 일반 버튼으로 변경 -->
        <button @click="goToSignUp" class="signup-link">회원가입</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      // 관리자 계정 확인 로직
      if (this.user.email === 'admin' && this.user.password === '1234') {
        alert('관리자 로그인 성공');
        if (this.$route.path !== '/dashboard') {
          this.$router.push('/dashboard'); // 대시보드로 이동
        }
        return;
      }

      // 로그인 로직 (서버 통신)
      this.$http
        .post('/api/login', this.user)
        .then((response) => {
          if (response.data.result === 1) {
            alert('로그인 성공');
            if (this.$route.path !== '/dashboard') {
              this.$router.push('/dashboard'); // 대시보드로 이동
            }
          } else {
            alert('로그인 실패, 다시 시도하세요.');
          }
        })
        .catch(() => {
          alert('오류가 발생했습니다.');
        });
    },
    goToSignUp() {
      // 회원가입 페이지로 이동
      this.$router.push('/signup');
    },
  },
};
</script>

<style scoped>
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
  display: block;
  margin-top: 10px;
  color: #007bff; /* 링크 색상 파란색 */
  text-decoration: none;
  font-weight: bold;
  transition: color 0.2s ease-in-out;
}

.signup-link:hover {
  color: #0056b3; /* 링크 호버 시 색상 */
}
</style>
