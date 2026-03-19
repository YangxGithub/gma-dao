import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import Users from '../pages/Users.vue';
import Settings from '../pages/Settings.vue';
import Login from '../pages/Login.vue';

const routes: RouteRecordRaw[] = [
  { path: '/login', name: 'login', component: Login },
  { path: '/', name: 'dashboard', component: Dashboard },
  { path: '/users', name: 'users', component: Users },
  { path: '/settings', name: 'settings', component: Settings }
];

// 这里固定使用 /admin/ 作为 base，配合 Vite preview 和线上服务器的重写规则
const router = createRouter({
  history: createWebHistory('/admin/'),
  routes
});

const WHITE_LIST = ['login'];

router.beforeEach((to, _from, next) => {
  const stored = sessionStorage.getItem('adminCurrentUser');
  const isAuthed = !!stored;

  if (WHITE_LIST.includes(to.name as string)) {
    // 已登录访问登录页，直接跳首页
    if (isAuthed) {
      next({ name: 'dashboard' });
    } else {
      next();
    }
    return;
  }

  if (!isAuthed) {
    next({ name: 'login', replace: true });
    return;
  }

  next();
});

export default router;

