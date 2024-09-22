<template>
  <div id="signup-test">
    <div class="title-container">
      <h1 class="web-title">IOT CHAMBER - 회원가입</h1>
    </div>
    <div id="signup-container">
      <div id="signup-card">
        <h2>회원가입</h2>

        <!-- 아이디 입력 및 중복 확인 -->
        <label for="username">아이디</label>
        <div class="input-group">
          <input
            v-model="user.username"
            id="username"
            type="text"
            placeholder=""
            @input="isUsernameChecked = false"
          />
          <button @click="checkUsername" class="check-button">중복 확인</button>
        </div>
        <p
          v-if="usernameMessage"
          :class="{
            'success-message': isUsernameAvailable,
            'error-message': !isUsernameAvailable,
          }"
        >
          {{ usernameMessage }}
        </p>

        <!-- 비밀번호 입력 -->
        <label for="password">비밀번호</label>
        <input
          v-model="user.password"
          id="password"
          type="password"
          placeholder=""
        />

        <!-- 비밀번호 확인 -->
        <label for="passwordConfirm">비밀번호 확인</label>
        <input
          v-model="passwordConfirm"
          id="passwordConfirm"
          type="password"
          placeholder=""
        />

        <!-- 비밀번호 일치 여부 메시지 -->
        <p
          v-if="passwordMatchMessage"
          :class="{
            'success-message': isPasswordMatched,
            'error-message': !isPasswordMatched,
          }"
        >
          {{ passwordMatchMessage }}
        </p>

        <!-- 이름 -->
        <label for="name">이름</label>
        <input v-model="user.name" id="name" type="text" placeholder="" />

        <!-- 전화번호 -->
        <label for="phone">전화번호</label>
        <input
          v-model="user.phone"
          id="phone"
          type="tel"
          placeholder=""
        />

        <!-- 이메일주소 -->
        <label for="email">이메일주소</label>
        <input
          v-model="user.email"
          id="email"
          type="email"
          placeholder=""
        />

        <!-- 생년월일 -->
        <label for="birthdate">생년월일</label>
        <input
          v-model="user.birthdate"
          id="birthdate"
          type="date"
          placeholder=""
        />

       <!-- 성별 선택 드롭다운 -->
        <label for="gender">성별</label>
        <select v-model="user.gender" id="gender">
          <option value="">성별을 선택하세요</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>

        <!-- 권한 선택 -->
        <label for="role">권한</label>
        <select v-model="user.role" id="role">
          <option value="">권한을 선택하세요</option>
          <option value="member">일반 회원</option>
          <option value="admin">관리자</option>
          <option value="operator">운용자</option>
        </select>

        <!-- 에러 메시지 표시 -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <!-- 회원가입 버튼 -->
        <button @click="signup">회원가입</button>
        <button @click="goToLogin" class="login-link">뒤로 돌아가기</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // axios 사용

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
        name: '',
        phone: '',
        email: '',
        birthdate: '',
        gender: '', // 성별 추가
        role: '',
      },
      passwordConfirm: '', // 비밀번호 확인 필드
      isUsernameAvailable: false, // 아이디 사용 가능 여부
      isUsernameChecked: false, // 아이디 중복 확인 여부
      usernameMessage: '', // 아이디 중복 확인 메시지
      errorMessage: '', // 기타 에러 메시지
    };
  },
  computed: {
    // 비밀번호와 비밀번호 확인의 일치 여부
    isPasswordMatched() {
      if (this.user.password && this.passwordConfirm) {
        return this.user.password === this.passwordConfirm;
      }
      return null; // 하나라도 비어있으면 null 반환
    },
    // 비밀번호 일치 여부에 따른 메시지
    passwordMatchMessage() {
      if (this.isPasswordMatched === null) {
        return '';
      } else if (this.isPasswordMatched) {
        return '비밀번호가 일치합니다.';
      } else {
        return '비밀번호가 일치하지 않습니다.';
      }
    },
  },
  methods: {
    // 아이디 중복 확인
    async checkUsername() {
      if (!this.user.username) {
        this.usernameMessage = '아이디를 입력해주세요.';
        this.isUsernameAvailable = false;
        return;
      }
      try {
        const response = await axios.post('/api/auth/check-username', {
          username: this.user.username,
        });
        if (response.data.available) {
          this.usernameMessage = '사용 가능한 아이디입니다.';
          this.isUsernameAvailable = true;
        } else {
          this.usernameMessage = '이미 사용 중인 아이디입니다.';
          this.isUsernameAvailable = false;
        }
        this.isUsernameChecked = true;
      } catch (error) {
        this.usernameMessage = '서버 오류가 발생했습니다.';
        this.isUsernameAvailable = false;
      }
    },

    // 회원가입
    async signup() {
      try {
        if (
          !this.user.username ||
          !this.user.password ||
          !this.passwordConfirm ||
          !this.user.name ||
          !this.user.phone ||
          !this.user.email ||
          !this.user.birthdate ||
          !this.user.gender || // 성별 필드 추가
          !this.user.role
        ) {
          this.errorMessage = '모든 필드를 입력해주세요.';
          return;
        }

        if (!this.isUsernameChecked) {
          this.errorMessage = '아이디 중복 확인을 해주세요.';
          return;
        }

        if (!this.isUsernameAvailable) {
          this.errorMessage = '사용할 수 없는 아이디입니다.';
          return;
        }

        if (!this.isPasswordMatched) {
          this.errorMessage = '비밀번호가 일치하지 않습니다.';
          return;
        } else {
          this.errorMessage = '';
        }

        const response = await axios.post('/api/auth/register', this.user);

        if (response.data.message === '회원가입 성공') {
          alert('회원가입 성공');
          this.errorMessage = '';
          this.$router.push('/login');
        } else {
          this.errorMessage =
            response.data.message || '회원가입 실패, 다시 시도하세요.';
        }
      } catch (error) {
        if (error.response) {
          this.errorMessage =
            error.response.data.message || '서버 오류가 발생했습니다.';
        } else {
          this.errorMessage = '서버에 연결할 수 없습니다. 다시 시도하세요.';
        }
      }
    },

    // 로그인 페이지로 이동
    goToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
input,
select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #444444;
  border-radius: 5px;
  background-color: #333333;
  color: #ffffff;
  text-align: left; /* 텍스트 왼쪽 정렬 */
  box-sizing: border-box; /* 패딩이 박스 너비에 포함되도록 설정 */
}

/* date 타입 input 필드에 대한 스타일 */
input[type="date"] {
  padding-left: 10px; /* date 타입 input의 패딩 설정 */
}

/* label과 입력 필드 사이의 여백을 동일하게 설정 */
label {
  display: block;
  text-align: left;
  margin-bottom: 5px;
  font-weight: bold;
  color: #bbbbbb;
  padding-left: 2px; /* 모든 label에 동일한 패딩 설정 */
}

/* 에러 메시지 스타일 */
.error-message {
  color: #ff4d4d;
  margin-bottom: 15px;
}

/* 성공 메시지 스타일 */
.success-message {
  color: #4caf50;
  margin-bottom: 15px;
}

/* 중복 확인 버튼 스타일 */
.check-button {
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.check-button:hover {
  background-color: #0056b3;
}

/* 페이지 전체 레이아웃 */
#signup-test {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #1a1a1a;
}

.title-container {
  margin-top: 20px;
}

.web-title {
  margin-top: 50px;
  color: #ffffff;
  font-size: 28px;
}

#signup-container {
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1a1a1a;
}

#signup-card {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background-color: #2a2a2a;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #ffffff;
}

label {
  display: block;
  text-align: left;
  margin-bottom: 5px;
  font-weight: bold;
  color: #bbbbbb;
}

input,
select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #444444;
  border-radius: 5px;
  background-color: #333333;
  color: #ffffff;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

button.login-link {
  display: block;
  margin-top: 10px;
  background-color: transparent;
  color: #007bff;
  border: 2px solid #007bff;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
}

button.login-link:hover {
  color: white;
  background-color: #007bff;
}
</style>
