// src/router/routes.js
import DashboardLayout from '@/layout/dashboard/DashboardLayout.vue';
import NotFound from '@/pages/NotFoundPage.vue';

// Page components
const Dashboard = () => import('@/pages/Dashboard.vue');
const Profile = () => import('@/pages/Profile.vue');
const TableList = () => import('@/pages/TableList.vue');
const Login = () => import('@/pages/Login.vue');
const SignUp = () => import('@/pages/SignUp.vue');

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
        meta: { requiresAuth: true }, // Requires authentication
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile,
        meta: { requiresAuth: true }, // Requires authentication
      },
      {
        path: 'table-list',
        name: 'table-list',
        component: TableList,
        meta: {
          requiresAuth: true,          // Requires authentication
          roles: ['admin', 'operator'], // Only accessible by admin and operator
        },
      },
    ],
  },
  { path: '*', component: NotFound },
];

export default routes;


// 보안 강화: 클라이언트 측에서의 인증 및 권한 검사는 쉽게 우회될 수 있으므로, 서버 측에서도 반드시 권한 체크를 수행해야하는데 일시적으로 웹에서만 하도록 설정
// 토큰 유효성 검사: 토큰의 만료 여부를 확인하여 만료된 토큰에 대한 처리를 추가로 구현..해야함