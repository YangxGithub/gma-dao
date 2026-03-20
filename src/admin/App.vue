<template>
  <a-config-provider :locale="enUS" :theme="antdTheme">
    <div class="admin-app">
      <!-- 登录页：占满整屏，只渲染登录页面本身 -->
      <div v-if="isLoginPage" class="login-fullscreen">
        <RouterView />
      </div>

      <!-- 其他页面：正常后台布局 -->
      <div v-else class="admin-layout">
        <a-layout style="min-height: 100vh">
          <a-layout-sider v-model:collapsed="collapsed">
            <div class="menu-container">
              <div class="logo">
                <LogoImg />
                <div>GMA Admin</div>
              </div>

              <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <a-menu-item key="1">
                  <RouterLink to="/config">
                    <div class="menu-item">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-layers w-4 h-4"
                        aria-hidden="true">
                        <path
                          d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path>
                        <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path>
                        <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path>
                      </svg>
                      <span>Layout &amp; Order</span>
                    </div>
                  </RouterLink>
                </a-menu-item>
                <a-menu-item key="2">
                  <div class="menu-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-layout-dashboard w-4 h-4"
                      aria-hidden="true">
                      <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                      <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                      <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                      <rect width="7" height="5" x="3" y="16" rx="1"></rect>
                    </svg>
                    <span>Navigation</span>
                  </div>
                </a-menu-item>
                <a-menu-item key="3">
                  <div class="menu-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-briefcase w-4 h-4"
                      aria-hidden="true">
                      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                    </svg>
                    <span>Trending Bar</span>
                  </div>
                </a-menu-item>
                <a-menu-item key="4">
                  <div class="menu-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-layout-dashboard w-4 h-4"
                      aria-hidden="true">
                      <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                      <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                      <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                      <rect width="7" height="5" x="3" y="16" rx="1"></rect>
                    </svg>
                    <span>Hero Section</span>
                  </div>
                </a-menu-item>
                <a-menu-item key="5">
                  <div class="menu-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-file-text w-4 h-4"
                      aria-hidden="true">
                      <path
                        d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
                      <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                      <path d="M10 9H8"></path>
                      <path d="M16 13H8"></path>
                      <path d="M16 17H8"></path>
                    </svg>
                    <span>About Section</span>
                  </div>
                </a-menu-item>
                <a-menu-item key="6">
                  <div class="menu-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-briefcase w-4 h-4"
                      aria-hidden="true">
                      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                    </svg>
                    <span>Business</span>
                  </div>
                </a-menu-item>
                <a-menu-item key="7">
                  <div class="menu-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-gamepad2 lucide-gamepad-2 w-4 h-4"
                      aria-hidden="true">
                      <line x1="6" x2="10" y1="11" y2="11"></line>
                      <line x1="8" x2="8" y1="9" y2="13"></line>
                      <line x1="15" x2="15.01" y1="12" y2="12"></line>
                      <line x1="18" x2="18.01" y1="10" y2="10"></line>
                      <path
                        d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"></path>
                    </svg>
                    <span>Games Index</span>
                  </div>
                </a-menu-item>
                <a-menu-item key="8">
                  <div class="menu-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-book-open w-4 h-4"
                      aria-hidden="true">
                      <path d="M12 7v14"></path>
                      <path
                        d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                    </svg>
                    <span>Media Center</span>
                  </div>
                </a-menu-item>
                <a-menu-item key="9">
                  <div class="menu-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-calendar w-4 h-4"
                      aria-hidden="true">
                      <path d="M8 2v4"></path>
                      <path d="M16 2v4"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <path d="M3 10h18"></path>
                    </svg>
                    <span>Events</span>
                  </div>
                </a-menu-item>
                <a-menu-item key="10">
                  <div class="menu-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-target w-4 h-4"
                      aria-hidden="true">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                    <span>Open Tasks</span>
                  </div>
                </a-menu-item>
                <a-menu-item key="11">
                  <div class="menu-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-briefcase w-4 h-4"
                      aria-hidden="true">
                      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                    </svg>
                    <span>Portfolio</span>
                  </div>
                </a-menu-item>
                <a-menu-item key="12">
                  <div class="menu-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-handshake w-4 h-4"
                      aria-hidden="true">
                      <path d="m11 17 2 2a1 1 0 1 0 3-3"></path>
                      <path
                        d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"></path>
                      <path d="m21 3 1 11h-2"></path>
                      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path>
                      <path d="M3 4h8"></path>
                    </svg>
                    <span>Partners</span>
                  </div>
                </a-menu-item>
                <a-menu-item key="13">
                  <div class="menu-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-file-text w-4 h-4"
                      aria-hidden="true">
                      <path
                        d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
                      <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                      <path d="M10 9H8"></path>
                      <path d="M16 13H8"></path>
                      <path d="M16 17H8"></path>
                    </svg>
                    <span>Footer</span>
                  </div>
                </a-menu-item>
                <a-menu-item key="14">
                  <RouterLink to="/config">
                    <div class="menu-item">
                      <SettingOutlined />
                      <span style="margin-inline-start: 0">Config</span>
                    </div>
                  </RouterLink>
                </a-menu-item>
              </a-menu>
            </div>
          </a-layout-sider>
          <a-layout>
            <a-layout-header>
              <div class="header-container">
                <a-space>
                  <div></div>
                </a-space>
                <a-space>
                  <a-button type="primary" :icon="h(SaveOutlined)">Save</a-button>
                  <a-button type="primary" :icon="h(UploadOutlined)">Upload</a-button>
                </a-space>
              </div>
            </a-layout-header>
            <a-layout-content>
              <div class="page-container">
                <RouterView />
              </div>
            </a-layout-content>
          </a-layout>
        </a-layout>
      </div>
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
import { computed, ref, h } from 'vue';
import { useRoute } from 'vue-router';
import { theme } from 'ant-design-vue';
import enUS from 'ant-design-vue/es/locale/en_US';
import LogoImg from './components/LogoImg.vue';
import { SaveOutlined, UploadOutlined, SettingOutlined } from '@ant-design/icons-vue';

const route = useRoute();

/** Ant Design Vue：暗色主题 + 英文 */
const antdTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#1f1f1f',
  },
};

const isLoginPage = computed(() => route.name === 'login');

const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);
</script>
