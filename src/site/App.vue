<template>
  <div class="site-app">
    <header class="site-header">
      <h1 class="logo">GMA 官网</h1>
      <nav class="nav">
      </nav>
    </header>

    <main class="site-main">
      <RouterView />
    </main>

    <footer class="site-footer">
      <p>© {{ new Date().getFullYear() }} GMA. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.site-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #eee;
}

.logo {
  margin: 0;
}

.nav {
  display: flex;
  gap: 1rem;
}

.site-main {
  flex: 1;
  padding: 2rem;
}

.site-footer {
  padding: 1rem 2rem;
  border-top: 1px solid #eee;
  text-align: center;
  font-size: 0.875rem;
  color: #666;
}
</style>
