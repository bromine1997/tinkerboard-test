import DashboardLayout from '@/layout/dashboard/DashboardLayout.vue';
import NotFound from '@/pages/NotFoundPage.vue';
import jwt_decode from 'jwt-decode'; // 여기서 jwt_decode를 import

// 페이지 컴포넌트들
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
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile,
      },
      {
        path: 'table-list',
        name: 'table-list',
        component: TableList,
        beforeEnter: (to, from, next) => {
          const token = localStorage.getItem('token');
          if (token) {
            const decodedToken = jwt_decode(token);
            const role = decodedToken.role;
            if (role === 'admin' || role === 'operator') {
              next();
            } else {
              alert('접근 권한이 없습니다.');
              next('/login');
            }
          } else {
            alert('로그인이 필요합니다.');
            next('/login');
          }
        },
      },
    ],
  },
  { path: '*', component: NotFound },
];

export default routes;
