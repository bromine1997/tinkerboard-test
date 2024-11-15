<!-- UserCard.vue -->
<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ user.name }}</h5>
      <p class="card-text">이메일: {{ user.email }}</p>
      <p class="card-text" v-if="user.phone">전화번호: {{ user.phone }}</p>
      <p class="card-text" v-if="user.birthDate">생년월일: {{ user.birthDate }}</p>
      <p class="card-text" v-if="user.gender">성별: {{ user.gender === 'male' ? '남성' : '여성' }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user'],
};
</script>
