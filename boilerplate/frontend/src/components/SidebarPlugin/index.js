import Sidebar from './SideBar.vue';
import SidebarLink from './SidebarLink';

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [],
  displaySidebar(value) {
    this.showSidebar = value;
  },
};

const SidebarPlugin = {
  install(app) {
    app.provide('sidebarStore', SidebarStore); // Provide 등록

    // 글로벌 컴포넌트 등록
    app.component('side-bar', Sidebar);
    app.component('sidebar-link', SidebarLink);
  },
};

export default SidebarPlugin;
