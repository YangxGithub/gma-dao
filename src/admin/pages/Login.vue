<template>
  <div class="login-page">
    <a-card class="login-card" :bordered="false">
      <div class="login-header">
        <h1 class="login-brand">GMA DAO</h1>
        <a-typography-text type="secondary">Admin Console</a-typography-text>
      </div>

      <a-typography-paragraph type="secondary" class="login-desc">
        Sign in to manage site configuration and uploads.
      </a-typography-paragraph>

      <a-alert v-if="error" :message="error" type="error" show-icon class="login-alert" />

      <a-form
        layout="vertical"
        :model="formState"
        name="admin_login"
        autocomplete="off"
        class="login-form"
        @finish="handleSubmit">
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please enter username' }]">
          <a-input v-model:value="formState.username" size="large" placeholder="admin" allow-clear>
            <template #prefix>
              <UserOutlined class="input-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please enter password' }]">
          <a-input-password v-model:value="formState.password" size="large" placeholder="Password" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block size="large" :loading="submitting">
            Sign in
          </a-button>
        </a-form-item>
      </a-form>

      <a-divider class="login-divider" />

      <a-typography-text type="secondary" class="login-hint">
        Development default: <code>admin</code> / <code>123456</code>
      </a-typography-text>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserOutlined } from '@ant-design/icons-vue';
import { useGmadaoConfigStore } from '../stores/gmadaoConfig';

const router = useRouter();
const gmadaoConfigStore = useGmadaoConfigStore();

const formState = reactive({
  username: 'admin',
  password: '123456'
});

const error = ref('');
const submitting = ref(false);

const handleSubmit = async () => {
  error.value = '';

  if (formState.username !== 'admin' || formState.password !== '123456') {
    error.value = 'Invalid username or password.';
    return;
  }

  const user = {
    username: formState.username,
    role: 'admin',
    loginAt: Date.now()
  };

  sessionStorage.setItem('adminCurrentUser', JSON.stringify(user));

  submitting.value = true;
  try {
    await gmadaoConfigStore.fetchConfig();
    router.replace({ name: 'config' });
  } catch {
    error.value = gmadaoConfigStore.error || 'Failed to load remote configuration. Please try again.';
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(160deg, #0d1117 0%, #161b22 45%, #21262d 100%);
}

.login-card {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.45);
}

.login-header {
  text-align: center;
  margin-bottom: 8px;
}

.login-brand {
  margin: 0 0 4px;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.login-desc {
  margin-bottom: 20px !important;
  font-size: 13px;
}

.login-alert {
  margin-bottom: 16px;
}

.login-form {
  margin-top: 4px;
}

.input-icon {
  color: rgba(255, 255, 255, 0.45);
}

.login-divider {
  margin: 8px 0 12px;
}

.login-hint {
  display: block;
  text-align: center;
  font-size: 12px;
}

.login-hint code {
  padding: 0 4px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
}
</style>
