<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <router-view></router-view>
    </fade-transition>
  </div>
</template>

<script>
import { Transition } from 'vue';

export default {
  components: {
    FadeTransition: Transition, // Vue 3에서는 Transition 컴포넌트를 사용
  },
};
</script>