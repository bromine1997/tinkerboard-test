<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="name">이름</label>
      <input
        type="text"
        id="name"
        class="form-control"
        v-model="localModel.name"
        required
      />
    </div>

    <div class="form-group">
      <label for="email">이메일</label>
      <input
        type="email"
        id="email"
        class="form-control"
        v-model="localModel.email"
        required
      />
    </div>

    <div class="form-group">
      <label for="phone">전화번호</label>
      <input
        type="text"
        id="phone"
        class="form-control"
        v-model="localModel.phone"
      />
    </div>

    <div class="form-group">
      <label for="birthDate">생일</label>
      <input
        type="date"
        id="birthDate"
        class="form-control"
        v-model="localModel.birthDate"
      />
    </div>

    <div class="form-group">
      <label for="gender">성별</label>
      <select id="gender" class="form-control" v-model="localModel.gender">
        <option value="">선택하세요</option>
        <option value="male">남성</option>
        <option value="female">여성</option>
        <option value="other">기타</option>
      </select>
    </div>

    <button type="submit" class="btn btn-primary">프로필 업데이트</button>
  </form>
</template>

<script>
export default {
  name: 'EditProfileForm',
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localModel: { ...this.model }, // 부모의 model을 복사하여 로컬 데이터로 사용
    };
  },
  watch: {
    model: {
      handler(newVal) {
        this.localModel = { ...newVal };
      },
      deep: true,
    },
  },
  methods: {
    submitForm() {
      // 부모 컴포넌트에 업데이트 이벤트 전달
      this.$emit('update-profile', this.localModel);
    },
  },
};
</script>

<style scoped>
/* 필요한 스타일 추가 */
</style>
