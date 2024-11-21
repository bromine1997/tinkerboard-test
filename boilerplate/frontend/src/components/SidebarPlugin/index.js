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
    // Vue 3에서는 app.config.globalProperties를 사용하여 글로벌 속성 추가
    app.config.globalProperties.$sidebar = SidebarStore;

    // 글로벌 컴포넌트 등록
    app.component('side-bar', Sidebar);
    app.component('sidebar-link', SidebarLink);
  },
};

export default SidebarPlugin;
