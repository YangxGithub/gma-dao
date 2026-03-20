import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { useGmadaoConfigStore } from '../stores/gmadaoConfig';
import Login from '../pages/Login.vue';
import ConfigManager from '../pages/ConfigManager.vue';
import User from '../pages/User.vue';

const routes: RouteRecordRaw[] = [
  { path: '/login', name: 'login', component: Login },
  { path: '/', name: 'user', component: User },
  { path: '/config', name: 'config', component: ConfigManager },
];

// Hash 模式：入口为 .../admin/index.html，路由在 # 后，如 #/login、#/user（勿再写 /admin/ base）
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const WHITE_LIST = ['login'];

router.beforeEach((to, _from, next) => {
  const stored = sessionStorage.getItem('adminCurrentUser');
  const isAuthed = !!stored;

  if (WHITE_LIST.includes(to.name as string)) {
    // 已登录访问登录页，直接跳首页
    if (isAuthed) {
      next('/config') 
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

/** 已登录且非登录页：刷新/直达路由时补拉配置（登录页在 Login 里已拉取） */
router.afterEach(async (to) => {
  if (to.name === 'login') return;
  if (!sessionStorage.getItem('adminCurrentUser')) return;

  const store = useGmadaoConfigStore();
  if (store.loaded || store.loading) return;

  try {
    await store.fetchConfig();
  } catch {
    // 错误已在 store.error，页面可按需展示
  }
});

export default router;
