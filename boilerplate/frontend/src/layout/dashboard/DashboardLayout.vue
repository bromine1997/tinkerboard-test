<template>
  <div class="wrapper">
    <side-bar>
      <template v-slot:links>
        <div class="section">
          <sidebar-link
            to="/dashboard"
            name = "Dashborad"
            icon="tim-icons icon-chart-pie-36"
          />
        </div>
        <h5 class="white-text">User Page</h5>
        <div class="section">
          <sidebar-link
            to="/dashboard/profile"
            name="사용자 프로필"
            icon="tim-icons icon-single-02"
          />
        </div>
        <h5 class="white-text">관리자 페이지</h5>
        <div class="section">
          <sidebar-link
            to="/dashboard/table-list"
            name="치료 기록"
            icon="tim-icons icon-puzzle-10"
          />
        </div>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <dashboard-content @click="toggleSidebar"></dashboard-content>
      <content-footer></content-footer>
    </div>
  </div>
</template>
<script>
import { inject } from 'vue';
import ContentFooter from './ContentFooter.vue';
import DashboardContent from './Content.vue';

export default {
  components: {
    ContentFooter,
    DashboardContent,
  },
  setup() {
    const sidebarStore = inject('sidebarStore'); // inject로 주입받음

    const toggleSidebar = () => {
      if (sidebarStore?.showSidebar) {
        sidebarStore.displaySidebar(false);
      }
    };

    return {
      toggleSidebar,
    };
  },
};
</script>

<style scoped>
.section {
  padding-left: 15px;
}
h5 {
  margin-top: 20px;
  padding-left: 15px;
  font-weight: bold;
  color: #888;
}
.white-text {
  color: white;
  font-weight: bold; /* 글자 강조를 원한다면 추가 */
  margin-top: 20px; /* 기존 h5와 일치 */
  padding-left: 15px; /* 기존 h5와 일치 */
}
</style>
