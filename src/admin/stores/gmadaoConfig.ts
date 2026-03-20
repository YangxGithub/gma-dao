import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getGmadaoConfigJsonUrl } from '../../config/gmadaoConfig';

/** 官网 GMADAO 远程 JSON 配置（登录后拉取，全管理端共享） */
export const useGmadaoConfigStore = defineStore('gmadaoConfig', () => {
  const gmadaoConfigJsonUrl = getGmadaoConfigJsonUrl();

  const config = ref<Record<string, unknown>>({});
  const loading = ref(false);
  const loaded = ref(false);
  const error = ref<string | null>(null);

  async function fetchConfig() {
    if (loading.value) return;

    loading.value = true;
    error.value = null;

    try {
      const res = await fetch(gmadaoConfigJsonUrl);
      if (!res.ok) {
        throw new Error(`加载配置失败: HTTP ${res.status}`);
      }

      const data = (await res.json()) as Record<string, unknown>;
      config.value = data;
      loaded.value = true;

      return data;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      error.value = msg;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  /** 本地编辑后写回 store（如 ConfigManager 保存后） */
  function setConfig(data: Record<string, unknown>) {
    config.value = data;
    loaded.value = true;
    error.value = null;
  }

  return {
    config,
    loading,
    loaded,
    error,
    fetchConfig,
    setConfig,
  };
});
