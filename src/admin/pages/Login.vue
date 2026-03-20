<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h2>管理后台登录</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-item">
          <label for="username">账号</label>
          <input id="username" v-model.trim="username" placeholder="请输入账号" autocomplete="username" />
        </div>
        <div class="form-item">
          <label for="password">密码</label>
          <input
            id="password"
            v-model.trim="password"
            type="password"
            placeholder="请输入密码"
            autocomplete="current-password" />
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit" class="primary-btn">登录</button>
        <p class="tip">默认账号：admin，密码：123456</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGmadaoConfigStore } from '../stores/gmadaoConfig';

const router = useRouter();
const gmadaoConfigStore = useGmadaoConfigStore();

const username = ref('admin');
const password = ref('123456');
const error = ref('');

const handleSubmit = async () => {
  error.value = '';

  if (!username.value || !password.value) {
    error.value = '请输入账号和密码';
    return;
  }

  if (username.value !== 'admin' || password.value !== '123456') {
    error.value = '账号或密码错误（默认：admin / 123456）';
    return;
  }

  const user = {
    username: username.value,
    role: 'admin',
    loginAt: Date.now(),
  };

  sessionStorage.setItem('adminCurrentUser', JSON.stringify(user));

  try {
    await gmadaoConfigStore.fetchConfig();
  } catch {
    error.value = gmadaoConfigStore.error || '远程配置加载失败，请稍后重试';
    return;
  }

  router.replace({ name: 'config' });
};
</script>
