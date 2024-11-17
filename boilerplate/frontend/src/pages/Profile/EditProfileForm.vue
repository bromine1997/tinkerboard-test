<!-- EditProfileForm.vue -->
<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="name">이름</label>
      <input type="text" id="name" v-model="localModel.name" class="form-control" />
    </div>
    <div class="form-group">
      <label for="email">이메일</label>
      <input type="email" id="email" v-model="localModel.email" class="form-control" />
    </div>
    <div class="form-group">
      <label for="phone">전화번호</label>
      <input type="text" id="phone" v-model="localModel.phone" class="form-control" />
    </div>
    <div class="form-group">
      <label for="birthDate">생년월일</label>
      <input type="date" id="birthDate" v-model="localModel.birthDate" class="form-control" />
    </div>
    <div class="form-group">
      <label for="gender">성별</label>
      <select id="gender" v-model="localModel.gender" class="form-control">
        <option value="">선택하세요</option>
        <option value="male">남성</option>
        <option value="female">여성</option>
        <option value="other">기타</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary">수정하기</button>
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
      localModel: {},
    };
  },
  watch: {
    model: {
      handler(newVal) {
        if (newVal) {
          this.localModel = { ...newVal };
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    onSubmit() {
      console.log('Submitting form with data:', this.localModel);
      this.$emit('update-profile', this.localModel);
    },
  },
};
</script>