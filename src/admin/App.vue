<template>
  <div class="admin-app">
    <!-- 登录页：占满整屏，只渲染登录页面本身 -->
    <div v-if="isLoginPage" class="login-fullscreen">
      <RouterView />
    </div>

    <!-- 其他页面：正常后台布局 -->
    <div v-else class="admin-layout">
      <aside class="sidebar">
        <h1 class="logo">GMA Admin</h1>
        <nav>
          <RouterLink to="/">配置管理</RouterLink>
          <RouterLink to="/user">用户管理</RouterLink>
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isLoginPage = computed(() => route.name === 'login');
</script>
