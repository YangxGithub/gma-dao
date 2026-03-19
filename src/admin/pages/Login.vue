<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h2>管理后台登录</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-item">
          <label for="username">账号</label>
          <input
            id="username"
            v-model.trim="username"
            placeholder="请输入账号"
            autocomplete="username"
          />
        </div>
        <div class="form-item">
          <label for="password">密码</label>
          <input
            id="password"
            v-model.trim="password"
            type="password"
            placeholder="请输入密码"
            autocomplete="current-password"
          />
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit" class="primary-btn">登录</button>
        <p class="tip">默认账号：admin，密码：123456（仅前端本地校验）</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref('');
const password = ref('');
const error = ref('');

const handleSubmit = () => {
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
    loginAt: Date.now()
  };

  sessionStorage.setItem('adminCurrentUser', JSON.stringify(user));

  router.replace({ name: 'dashboard' });
};
</script>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
}

.login-card {
  width: 320px;
  padding: 2rem 2.5rem;
  border-radius: 0.75rem;
  background: #111827;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
  color: #e5e7eb;
}

h2 {
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  text-align: center;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

label {
  font-size: 0.875rem;
  color: #9ca3af;
}

input {
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #374151;
  background: #020617;
  color: #e5e7eb;
  outline: none;
}

input:focus {
  border-color: #60a5fa;
}

.primary-btn {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background: #2563eb;
  color: #fff;
  cursor: pointer;
}

.primary-btn:hover {
  background: #1d4ed8;
}

.error {
  margin: 0.25rem 0 0;
  font-size: 0.8125rem;
  color: #fca5a5;
}

.tip {
  margin-top: 0.75rem;
  font-size: 0.75rem;
  color: #9ca3af;
  text-align: center;
}
</style>

