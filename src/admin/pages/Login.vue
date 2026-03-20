<template>
  <div class="login-page">
    <a-card>
      <div class="login-card">
        <div class="logo"><LogoImg /></div>
        <div class="title">GMA Admin</div>
        <div class="description">Manage your website content</div>
        <a-form style="width: 100%" layout="vertical" :model="formState" autocomplete="off" @finish="handleSubmit">
          <a-form-item label="Username" name="username" :rules="[{ required: true, message: 'Please enter username' }]">
            <a-input v-model:value="formState.username" size="large" placeholder="admin" allow-clear>
              <template #prefix>
                <UserOutlined class="input-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please enter password' }]">
            <a-input-password v-model:value="formState.password" size="large" placeholder="Password" />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit" block size="large" :loading="submitLoading"> Login </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserOutlined } from '@ant-design/icons-vue';
import { useGmadaoConfigStore } from '../stores/gmadaoConfig';
import { message } from 'ant-design-vue';
import LogoImg from '../components/LogoImg.vue';

const router = useRouter();
const gmadaoConfigStore = useGmadaoConfigStore();

const formState = reactive({ username: 'admin', password: '123456' });

const submitLoading = ref(false);

const handleSubmit = async () => {
  if (submitLoading.value) return;

  if (formState.username !== 'admin' || formState.password !== '123456') {
    message.error('Invalid username or password.');
    return;
  }

  const user = {
    username: formState.username,
    role: 'admin',
    loginAt: Date.now(),
  };

  sessionStorage.setItem('adminCurrentUser', JSON.stringify(user));

  submitLoading.value = true;
  try {
    await gmadaoConfigStore.fetchConfig();
    router.replace('/');
  } catch {
    message.error('Failed to load remote configuration. Please try again.');
  } finally {
    submitLoading.value = false;
  }
};
</script>
