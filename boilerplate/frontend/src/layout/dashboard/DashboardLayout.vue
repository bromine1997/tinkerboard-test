<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <div class="section">
          <sidebar-link
            to="/dashboard"  :name="$t('sidebar.dashboard')"  icon="tim-icons icon-chart-pie-36"
          />
        </div>
        <h5>User Page</h5>
        <div class="section">
          <sidebar-link to="/dashboard/profile" :name="$t('sidebar.userProfile')" icon="tim-icons icon-single-02" />
        </div>
        <h5>관리자 페이지</h5>
        <div class="section">
          <sidebar-link to="/dashboard/table-list" :name="$t('sidebar.tableList')" icon="tim-icons icon-puzzle-10" />
        </div>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <dashboard-content @click.native="toggleSidebar"></dashboard-content>
      <content-footer></content-footer>
    </div>
  </div>
</template>

<style lang="scss">
.section {
  padding-left: 15px;
}
h5 {
  margin-top: 20px;
  padding-left: 15px;
  font-weight: bold;
  color: #888;
}
</style>

<script>
import TopNavbar from './TopNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import DashboardContent from './Content.vue';

export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
