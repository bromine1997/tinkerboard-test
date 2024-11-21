<template>
  <nav
    class="navbar navbar-expand-lg navbar-absolute"
    :class="{ 'bg-white': showMenu, 'navbar-transparent': !showMenu }"
  >
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div class="navbar-toggle d-inline" :class="{ toggled: sidebarStore.showSidebar }">
          <button
            type="button"
            class="navbar-toggler"
            aria-label="Navbar toggle button"
            @click="toggleSidebar"
          >
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand" href="#">{{ routeName }}</a>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        data-toggle="collapse"
        data-target="#navigation"
        aria-controls="navigation-index"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>

      <transition name="fade">
        <div class="collapse navbar-collapse show" v-show="showMenu">
          <ul class="navbar-nav" :class="isRTL ? 'mr-auto' : 'ml-auto'">
            <!-- Add your additional nav items here -->
          </ul>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script>
import { ref, computed, inject } from 'vue';

export default {
  setup() {
    const route = inject('route'); // Inject Vue Router
    const sidebarStore = inject('sidebarStore');
    const rtlStore = inject('rtlStore');
    const showMenu = ref(false);

    const routeName = computed(() => route.name);

    const toggleSidebar = () => {
      sidebarStore.displaySidebar(!sidebarStore.showSidebar);
    };

    const toggleMenu = () => {
      showMenu.value = !showMenu.value;
    };

    return {
      routeName,
      isRTL: rtlStore.isRTL,
      showMenu,
      toggleSidebar,
      toggleMenu,
    };
  },
};
</script>

<style></style>
