<!-- EditProfileForm.vue -->
<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="name">이름</label>
      <input type="text" id="name" v-model="model.name" class="form-control" />
    </div>
    <div class="form-group">
      <label for="email">이메일</label>
      <input type="email" id="email" v-model="model.email" class="form-control" />
    </div>
    <div class="form-group">
      <label for="phone">전화번호</label>
      <input type="text" id="phone" v-model="model.phone" class="form-control" />
    </div>
    <div class="form-group">
      <label for="birthDate">생년월일</label>
      <input type="date" id="birthDate" v-model="model.birthDate" class="form-control" />
    </div>
    <div class="form-group">
      <label for="gender">성별</label>
      <select id="gender" v-model="model.gender" class="form-control">
        <option value="">선택하세요</option>
        <option value="male">남성</option>
        <option value="female">여성</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary">수정하기</button>
  </form>
</template>

<script>
export default {
  props: ['model'],
  methods: {
    onSubmit() {
      this.$emit('update-profile', this.model);
    },
  },
};
</script>
