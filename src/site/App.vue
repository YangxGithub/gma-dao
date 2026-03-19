<template>
  <div class="site-app">
    <header class="site-header">
      <h1 class="logo">GMA 官网</h1>
      <nav class="nav"></nav>
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
