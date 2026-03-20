<template>
  <section class="config-page">
    <h2>GMADAO 配置管理</h2>

    <div class="controls">
      <button type="button" class="btn" @click="loadRemote">加载线上配置</button>
      <button type="button" class="btn primary" @click="uploadFile">导出并上传</button>
    </div>

    <p v-if="status" class="status">{{ status }}</p>

    <textarea v-model="jsonText" rows="14" class="textarea"></textarea>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useGmadaoConfigStore } from '../stores/gmadaoConfig';
import { getGmadaoConfigBaseUrl, getGmadaoConfigJsonUrl, getGmadaoConfigFileConfig } from '../../config/gmadaoConfig';

const gmadaoConfigStore = useGmadaoConfigStore();
const UPLOAD_URL = getGmadaoConfigBaseUrl();
const DOWNLOAD_URL = getGmadaoConfigJsonUrl();

const jsonText = ref('');
const status = ref('');

const loadRemote = async () => {
  status.value = '加载中...';
  try {
    // 防缓存核心代码
    const timestamp = new Date().getTime();
    const url = `${DOWNLOAD_URL}?t=${timestamp}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    });
    if (!res.ok) {
      throw new Error(`GET failed: ${res.status}`);
    }
    const raw = await res.text();
    try {
      const obj = JSON.parse(raw) as Record<string, unknown>;
      jsonText.value = JSON.stringify(obj, null, 2);
      gmadaoConfigStore.setConfig(obj);
    } catch {
      jsonText.value = raw;
    }
    status.value = '加载成功 ✅';
  } catch (e) {
    status.value = '加载失败：请检查跨域(CORS)或接口地址是否正确。' + (e instanceof Error ? ` (${e.message})` : '');
  }
};

const uploadFile = async () => {
  status.value = '上传中...';
  try {
    let obj: unknown = null;
    try {
      obj = JSON.parse(jsonText.value);
    } catch {
      throw new Error('当前 JSON 内容不是合法 JSON');
    }

    const json = JSON.stringify(obj, null, 2);
    const blob = new Blob([json], { type: 'application/json' });

    const fileCfg = getGmadaoConfigFileConfig();
    const form = new FormData();
    form.append(fileCfg.fieldName, blob, fileCfg.fileName);

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: form,
      credentials: 'include',
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`POST failed: ${res.status} ${text}`.trim());
    }

    status.value = '上传成功 ✅';
    await loadRemote();
  } catch (e) {
    status.value =
      '上传失败：请让后端确认上传字段名/接口方法/是否要求鉴权。' + (e instanceof Error ? ` (${e.message})` : '');
  }
};

onMounted(() => {
  if (gmadaoConfigStore.loaded && Object.keys(gmadaoConfigStore.config).length > 0) {
    jsonText.value = JSON.stringify(gmadaoConfigStore.config, null, 2);
    return;
  }
  loadRemote();
});
</script>

<style scoped>
.config-page {
  padding: 1rem;
}

.controls {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.btn {
  padding: 0.5rem 0.9rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
}

.btn.primary {
  border-color: #2563eb;
  background: #2563eb;
  color: #fff;
}

.field {
  margin: 0.75rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-width: 520px;
}

label {
  font-size: 0.875rem;
  color: #6b7280;
}

input {
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
}

.textarea {
  width: 100%;
  margin-top: 0.75rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  resize: vertical;
}

.status {
  margin-top: 0.5rem;
  color: #6b7280;
}
</style>
