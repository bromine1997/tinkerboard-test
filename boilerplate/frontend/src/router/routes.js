import DashboardLayout from '@/layout/dashboard/DashboardLayout.vue';
// GeneralViews
import NotFound from '@/pages/NotFoundPage.vue';

// Admin pages
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/pages/Dashboard.vue');
const Profile = () => import(/* webpackChunkName: "common" */ '@/pages/Profile.vue');
const Notifications = () => import(/* webpackChunkName: "common" */ '@/pages/Notifications.vue');
const Icons = () => import(/* webpackChunkName: "common" */ '@/pages/Icons.vue');
const Typography = () => import(/* webpackChunkName: "common" */ '@/pages/Typography.vue');
const TableList = () => import(/* webpackChunkName: "common" */ '@/pages/TableList.vue');

// Auth pages
const Login = () => import(/* webpackChunkName: "auth" */ '@/pages/Login.vue');
const SignUp = () => import(/* webpackChunkName: "auth" */ '@/pages/SignUp.vue');


const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile,
      },
      {
        path: 'notifications',
        name: 'notifications',
        component: Notifications,
      },
      {
        path: 'icons',
        name: 'icons',
        component: Icons,
      },
      {
        path: 'typography',
        name: 'typography',
        component: Typography,
      },
      {
        path: 'table-list',
        name: 'table-list',
        component: TableList,
      },
    ],
  },
  { path: '*', component: NotFound },
];

export default routes;