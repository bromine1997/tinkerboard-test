import DashboardLayout from '@/layout/dashboard/DashboardLayout.vue';
import NotFound from '@/pages/NotFoundPage.vue';

// Page components (Lazy-loading with dynamic import)
const Dashboard = () => import('@/pages/Dashboard.vue');
const Profile = () => import('@/pages/Profile.vue');
const TableList = () => import('@/pages/TableList.vue');
const Login = () => import('@/pages/Login.vue');
const SignUp = () => import('@/pages/SignUp.vue');
const PressureProfileList = () => import('@/pages/PressureProfileList.vue'); // 새 페이지 컴포넌트

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
      {
        path: 'PressureProfileList', // 새 라우트 경로
        name: 'PressureProfileList',
        component: PressureProfileList, // 새 페이지 컴포넌트
        meta: {
          requiresAuth: true,          // Requires authentication
          roles: ['admin', 'operator'], // Only accessible by admin and operator
        },
      },
    ],
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound',
    component: NotFound,
  },
];

export default routes;
