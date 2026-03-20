<template>
  <section class="config-page">
    <a-card class="config-card" title="配置管理">
      <a-space direction="vertical" size="middle" style="width: 100%">
        <a-space wrap>
          <a-button @click="loadRemote">加载线上配置</a-button>
          <a-button type="primary" @click="saveAndOpenUpload">保存并打开上传页</a-button>
        </a-space>

        <a-alert v-if="status" :message="status" :type="statusType" show-icon />

        <a-textarea
          v-model:value="jsonText"
          class="json-editor"
          :auto-size="{ minRows: 12, maxRows: 30 }"
          placeholder="编辑 GMADAOConfig.Json" />

        <a-modal
          v-model:open="uploadModalOpen"
          title="上传 JSON"
          :footer="null"
          destroy-on-close
          @after-close="onUploadModalAfterClose">
          <div class="upload-modal-body">
            <p class="modal-hint">
              已下载 <strong>{{ fileCfg.fileName }}</strong
              >。请在下方选择该文件并上传。
            </p>
            <p class="modal-hint secondary">关闭弹窗后会自动刷新配置。</p>
            <p class="modal-hint secondary hint-secondary">若下方空白，请用新窗口打开上传页。</p>
            <div class="modal-actions">
              <a :href="uploadPageAbsoluteUrl" target="_blank" rel="noopener noreferrer">新窗口打开</a>
            </div>
            <div class="iframe-wrap">
              <iframe :key="iframeKey" class="upload-iframe" title="GMADAO API upload" :src="uploadPageSrc" />
            </div>
          </div>
        </a-modal>
      </a-space>
    </a-card>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useGmadaoConfigStore } from '../stores/gmadaoConfig';
import { getGmadaoConfigBaseUrl, getGmadaoConfigJsonUrl, getGmadaoConfigFileConfig } from '../../config/gmadaoConfig';

const gmadaoConfigStore = useGmadaoConfigStore();
const DOWNLOAD_URL = getGmadaoConfigJsonUrl();
const fileCfg = getGmadaoConfigFileConfig();

const uploadPageSrc = getGmadaoConfigBaseUrl();

const uploadPageAbsoluteUrl = computed(() => {
  const base = uploadPageSrc;
  if (base.startsWith('http://') || base.startsWith('https://')) {
    return base;
  }
  return new URL(base, window.location.origin).href;
});

const jsonText = ref('');
const status = ref('');
const uploadModalOpen = ref(false);
/** iframe 每次打开弹窗刷新，避免残留上次表单状态 */
const iframeKey = ref(0);

const statusType = computed(() => {
  if (!status.value) return 'info';
  if (status.value.includes('加载成功') || status.value.includes('下载完成')) return 'success';
  if (status.value.includes('加载失败') || status.value.includes('失败') || status.value.includes('错误'))
    return 'error';
  return 'info';
});

const loadRemote = async () => {
  status.value = '加载中...';
  try {
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
    status.value = '加载成功';
  } catch (e) {
    status.value = '加载失败' + (e instanceof Error ? `：${e.message}` : '');
  }
};

function downloadJsonFile(content: string, fileName: string) {
  const blob = new Blob([content], { type: 'application/json' });
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = objectUrl;
  a.download = fileName;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(objectUrl);
}

const saveAndOpenUpload = () => {
  try {
    const obj = JSON.parse(jsonText.value);
    const json = JSON.stringify(obj, null, 2);
    downloadJsonFile(json, fileCfg.fileName);
    status.value = '下载完成，请上传';
    iframeKey.value += 1;
    uploadModalOpen.value = true;
  } catch {
    status.value = '保存失败：不是合法 JSON';
  }
};

const onUploadModalAfterClose = () => {
  void loadRemote();
};

onMounted(() => {
  if (gmadaoConfigStore.loaded && Object.keys(gmadaoConfigStore.config).length > 0) {
    jsonText.value = JSON.stringify(gmadaoConfigStore.config, null, 2);
    return;
  }
  loadRemote();
});
</script>

<style scoped lang="scss">
.config-page {
  padding: 1rem;
}

.config-card :deep(.ant-card-head-title) {
  font-weight: 600;
}

.json-editor :deep(.ant-input),
.json-editor :deep(textarea) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
}

.upload-modal-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.modal-hint {
  margin: 0;
  line-height: 1.6;
}

.modal-hint.secondary {
  font-size: 0.875rem;
  opacity: 0.72;
}

.hint-secondary {
  margin-top: -0.25rem;
}

.modal-actions {
  display: flex;
  gap: 0.5rem;
}

.iframe-wrap {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
}

.upload-iframe {
  display: block;
  width: 100%;
  height: 200px;
  border: 0;
}
</style>
