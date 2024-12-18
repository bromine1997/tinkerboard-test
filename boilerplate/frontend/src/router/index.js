import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { getUserRole } from '@/utils/auth'; // 헬퍼 함수 임포트

// 라우터 생성
const router = createRouter({
  history: createWebHistory(), // HTML5 History 모드 사용
  routes,
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// 글로벌 네비게이션 가드
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const allowedRoles = to.meta.roles;
  const token = localStorage.getItem('token');

  if (requiresAuth) {
    if (!token) {
      // 인증되지 않은 사용자
      return next({ name: 'login' });
    } else {
      // 인증된 사용자
      const userRole = getUserRole();

      if (allowedRoles) {
        // 특정 역할이 필요한 라우트
        if (allowedRoles.includes(userRole)) {
          // 사용자에게 필요한 역할이 있음
          return next();
        } else {
          // 사용자에게 필요한 역할이 없음
          alert('일반사용자는 접근권한이 없습니다.');
          return next({ name: 'dashboard' });
        }
      } else {
        // 인증만 필요하고 특정 역할은 필요하지 않음
        return next();
      }
    }
  } else {
    // 인증이 필요 없는 라우트
    return next();
  }
});

export default router;
