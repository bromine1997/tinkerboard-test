import SideBar from '@/components/SidebarPlugin';
import Notify from '@/components/NotificationPlugin';
import GlobalComponents from './globalComponents';
import GlobalDirectives from './globalDirectives';
import RTLPlugin from './RTLPlugin';

// CSS assets
import '@/assets/sass/black-dashboard.scss';
import '@/assets/css/nucleo-icons.css';
import '@/assets/demo/demo.css';

export default {
  install(app) {
    // Vue 3에서는 app.use()를 사용하여 플러그인을 등록
    app.use(GlobalComponents);
    app.use(GlobalDirectives);
    app.use(SideBar);
    app.use(Notify);
    app.use(RTLPlugin);
  },
};
