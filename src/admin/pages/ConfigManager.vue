<template>
  <section class="config-page">
    <h2>JSON 预览</h2>

    <div class="controls">
      <button type="button" class="btn" @click="loadRemote">加载线上配置</button>
      <button type="button" class="btn primary" @click="saveAndOpenUpload">保存（下载 JSON 并打开上传页）</button>
    </div>

    <p v-if="status" class="status">{{ status }}</p>

    <textarea v-model="jsonText" rows="14" class="textarea"></textarea>

    <a-modal
      v-model:open="uploadModalOpen"
      title="在官方上传页提交 JSON"
      width="min(960px, 96vw)"
      :footer="null"
      destroy-on-close
      @after-close="onUploadModalAfterClose">
      <div class="upload-modal-body">
        <p class="modal-hint">
          已触发下载 <strong>{{ fileCfg.fileName }}</strong
          >。请在下方页面选择该文件并点击上传。
          由于跨域限制，无法自动检测上传是否成功；<strong>关闭本弹窗后将自动重新拉取线上配置</strong>。
        </p>
        <p class="modal-hint secondary">
          若下方区域空白，可能是对方站点禁止被嵌入（X-Frame-Options），请用新窗口打开上传页。
        </p>
        <div class="modal-actions">
          <a :href="uploadPageAbsoluteUrl" target="_blank" rel="noopener noreferrer">新窗口打开上传页</a>
        </div>
        <div class="iframe-wrap">
          <iframe :key="iframeKey" class="upload-iframe" title="GMADAO API upload" :src="uploadPageSrc" />
        </div>
      </div>
    </a-modal>
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
    status.value = '加载成功 ✅';
  } catch (e) {
    status.value = '加载失败：请检查跨域(CORS)或接口地址是否正确。' + (e instanceof Error ? ` (${e.message})` : '');
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
    status.value = '已下载 JSON，请在上传页提交。';
    iframeKey.value += 1;
    uploadModalOpen.value = true;
  } catch {
    status.value = '保存失败：当前内容不是合法 JSON。';
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
