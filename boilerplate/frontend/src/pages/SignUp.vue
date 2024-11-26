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
            placeholder="아이디"
            @input="isUsernameChecked = false"
          />
          <button @click="checkUsername" class="check-button" :disabled="!user.username">중복 확인</button>
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
          placeholder="비밀번호"
        />
        <p v-if="passwordStrengthMessage">{{ passwordStrengthMessage }}</p>

        <!-- 비밀번호 확인 -->
        <label for="passwordConfirm">비밀번호 확인</label>
        <input
          v-model="passwordConfirm"
          id="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
        />
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
        <input v-model="user.name" id="name" type="text" placeholder="이름" />

        <!-- 전화번호 -->
        <label for="phone">전화번호</label>
        <input
          v-model="user.phone"
          id="phone"
          type="tel"
          placeholder="전화번호"
        />

        <!-- 이메일주소 -->
        <label for="email">이메일주소</label>
        <input
          v-model="user.email"
          id="email"
          type="email"
          placeholder="이메일"
        />

        <!-- 생년월일 -->
        <label for="birthdate">생년월일</label>
        <input
          v-model="user.birthDate"
          id="birthdate"
          type="date"
          placeholder="생년월일"
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

        <!-- 개인정보 이용동의서 체크박스 -->
        <div class="agreement-container">
          <label for="agreement" class="agreement-label">
            개인정보 이용동의서에 동의합니다.
          </label>
          <input
            type="checkbox"
            id="agreement"
            v-model="user.agreement"
          />
        </div>
        <p v-if="agreementError" class="error-message">{{ agreementError }}</p>

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
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
        name: '',
        phone: '',
        email: '',
        birthDate: '', // 'birthDate'로 일관성 유지
        gender: '',
        role: '',
        agreement: false, // 개인정보 동의 상태 추가
      },
      passwordConfirm: '',
      isUsernameAvailable: false,
      isUsernameChecked: false,
      usernameMessage: '',
      errorMessage: '',
      agreementError: '', // 동의 체크 에러 메시지
    };
  },
  computed: {
    // 비밀번호와 비밀번호 확인의 일치 여부
    isPasswordMatched() {
      return this.user.password === this.passwordConfirm && this.user.password !== '';
    },
    // 비밀번호 일치 여부에 따른 메시지
    passwordMatchMessage() {
      if (this.user.password && this.passwordConfirm) {
        return this.isPasswordMatched ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.';
      }
      return '';
    },
    // 비밀번호 강도 체크 (6자리 이상만 검증)
    passwordStrengthMessage() {
      const strongPassword = /^.{6,}$/;
      return this.user.password && !strongPassword.test(this.user.password)
        ? '비밀번호는 최소 6자 이상이어야 합니다.'
        : '';
    },
    // 모든 필드가 입력되었는지 확인
    isFormValid() {
      return (
        this.user.username &&
        this.user.password &&
        this.passwordConfirm &&
        this.user.name &&
        this.user.phone &&
        this.user.email &&
        this.user.birthDate &&
        this.user.gender &&
        this.user.role &&
        this.user.agreement // 개인정보 동의 확인 추가
      );
    }
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
        const response = await axios.post('/auth/check-username', {
          username: this.user.username,
        });
        this.isUsernameAvailable = response.data.available;
        this.usernameMessage = this.isUsernameAvailable
          ? '사용 가능한 아이디입니다.'
          : '이미 사용 중인 아이디입니다.';
        this.isUsernameChecked = true;
      } catch (error) {
        this.usernameMessage = '서버 오류가 발생했습니다.';
        this.isUsernameAvailable = false;
      }
    },

    // 회원가입 처리
    async signup() {
      this.errorMessage = ''; // 기존 에러 메시지 초기화
      this.agreementError = ''; // 동의 에러 메시지 초기화

      if (!this.isFormValid) {
        if (!this.user.agreement) {
          this.agreementError = '개인정보 이용동의에 동의해주세요.';
        } else {
          this.errorMessage = '모든 필드를 입력해주세요.';
        }
        return;
      }

      // birthDate 값을 'YYYY-MM-DD' 형식의 문자열로 변환
      this.user.birthDate = new Date(this.user.birthDate).toISOString().split('T')[0];

      console.log('birthDate:', this.user.birthDate); // 생년월일 로그 확인

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
      }

      if (this.passwordStrengthMessage) {
        this.errorMessage = this.passwordStrengthMessage;
        return;
      }

      try {
        const response = await axios.post('/auth/register', this.user);
        if (response.data.message === '회원가입 성공') {
          alert('회원가입 성공');
          this.$router.push('/login');
        } else {
          this.errorMessage = response.data.message || '회원가입 실패, 다시 시도하세요.';
        }
      } catch (error) {
        this.errorMessage = '서버 오류가 발생했습니다. 다시 시도하세요.';
      }
    },

    // 로그인 페이지로 이동
    goToLogin() {
      this.$router.push('/login');
    }
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
/* 개인정보 이용동의서 스타일 수정 */
.agreement-container {
  display: flex;
  align-items: flex-start; /* 상단 정렬로 변경 */
  margin-bottom: 15px;
  gap: 8px; /* checkbox와 label 사이 간격 */
}

/* 체크박스 크기 조정 */
.agreement-container input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin-top: 3px; /* 텍스트와 수직 정렬 맞추기 */
  cursor: pointer;
}

/* 동의서 텍스트 스타일 */
.agreement-label {
  flex: 1;
  text-align: left;
  color: #bbbbbb;
  font-weight: normal;
  font-size: 14px; /* 글자 크기 조정 */
  line-height: 1.4; /* 줄 간격 조정 */
  margin: 0; /* 기존 마진 제거 */
  word-break: keep-all; /* 단어 분리 방지 */
}

/* 에러 메시지 스타일 유지 */
.error-message {
  color: #ff4d4d;
  margin-bottom: 15px;
  font-size: 14px;
  text-align: left;
}
</style>
