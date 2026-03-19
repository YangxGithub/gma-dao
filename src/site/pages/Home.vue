<template>
  <section class="hero">
    <div class="hero-content">
      <h2>欢迎来到 GMA 官网</h2>
      <p>这里可以放产品简介、公司愿景、核心卖点等内容。</p>
      <button class="primary-btn">立即咨询</button>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}

.hero-content {
  max-width: 640px;
}

.primary-btn {
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  border: none;
  background: #2563eb;
  color: #fff;
  cursor: pointer;
}
.primary-btn:hover {
  background: #1d4ed8;
}
</style>

