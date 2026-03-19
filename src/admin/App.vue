<template>
  <!-- 登录页：占满整屏，只渲染登录页面本身 -->
  <div v-if="isLoginPage" class="login-fullscreen">
    <RouterView />
  </div>

  <!-- 其他页面：正常后台布局 -->
  <div v-else class="admin-layout">
    <aside class="sidebar">
      <h1 class="logo">GMA Admin</h1>
      <nav>
        <RouterLink to="/">仪表盘</RouterLink>
        <RouterLink to="/users">用户管理</RouterLink>
        <RouterLink to="/settings">系统设置</RouterLink>
      </nav>
    </aside>

    <div class="content-area">
      <header class="topbar">
        <span>欢迎回来，管理员</span>
      </header>
      <main class="main">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isLoginPage = computed(() => route.name === 'login');
</script>

<style scoped>
.admin-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.sidebar {
  background: #0f172a;
  color: #e5e7eb;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.logo {
  font-size: 1.25rem;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

nav a {
  color: inherit;
  text-decoration: none;
}

nav a.router-link-active {
  color: #60a5fa;
}

.content-area {
  display: flex;
  flex-direction: column;
}

.topbar {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.main {
  padding: 1.5rem;
  background: #f3f4f6;
  flex: 1;
}

.login-fullscreen {
  min-height: 100vh;
}
</style>

