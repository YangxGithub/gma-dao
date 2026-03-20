<template>
  <a-config-provider :locale="enUS" :theme="antdTheme">
    <div class="site-app">
      <header class="site-header">
        <nav class="nav">
          <div class="logo">
            <svg
              code-path="src/components/Logo.tsx:21:7"
              width="52"
              height="52"
              viewBox="0 0 100 100"
              fill="none"
              class="flex-shrink-0">
              <path
                code-path="src/components/Logo.tsx:29:9"
                d="M55 25L85 75"
                stroke="#1e40af"
                stroke-width="8"
                stroke-linecap="round"></path>
              <path
                code-path="src/components/Logo.tsx:36:9"
                d="M45 25L15 75"
                stroke="#dc2626"
                stroke-width="8"
                stroke-linecap="round"></path>
              <path
                code-path="src/components/Logo.tsx:43:9"
                d="M55 25C65 15 80 15 90 25"
                stroke="#1e40af"
                stroke-width="8"
                stroke-linecap="round"
                fill="none"></path>
              <path
                code-path="src/components/Logo.tsx:51:9"
                d="M45 25C35 15 20 15 10 25"
                stroke="#dc2626"
                stroke-width="8"
                stroke-linecap="round"
                fill="none"></path>
              <path
                code-path="src/components/Logo.tsx:59:9"
                d="M25 75L50 95L75 75"
                stroke="#1e40af"
                stroke-width="6"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"></path>
              <path code-path="src/components/Logo.tsx:68:9" d="M50 35L60 50L50 65L40 50Z" fill="#dc2626"></path>
              <path code-path="src/components/Logo.tsx:73:9" d="M50 42L55 50L50 58L45 50Z" fill="white"></path>
            </svg>
            <div class="logo-text">GAME MINE ALLIANCE</div>
          </div>
          <div class="link-list">
            <button>About</button>
            <button>Business</button>
            <button>Games Index</button>
            <button>Media</button>
            <button>Event</button>
            <button>OpenTask</button>
            <button>Portfolio</button>
            <button>Partners</button>
            <button>Twitter</button>
          </div>
          <div class="btn-list">
            <button class="twitter">
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
                class="lucide lucide-twitter w-4 h-4"
                aria-hidden="true">
                <path
                  d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              Twitter
            </button>
            <button class="contribute">
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
              Contribute
            </button>
          </div>
        </nav>
      </header>

      <main class="site-main">
        <RouterView />
      </main>

      <footer class="site-footer">
        <p>© {{ new Date().getFullYear() }} GMA. All rights reserved.</p>
      </footer>
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue';
import enUS from 'ant-design-vue/es/locale/en_US';

/** Ant Design Vue：暗色主题 + 英文 */
const antdTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#1f1f1f',
  },
};
</script>
