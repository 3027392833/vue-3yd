<template>
  <div id="app">
    <Navigation />
    <router-view />
  </div>
</template>

<script setup>
import Navigation from './components/Navigation.vue'
</script>

<style>
#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
}

/* 为路由视图添加顶部间距，避免被导航栏遮挡 */
.router-view {
  padding-top: 60px;
}

/* 确保路由视图占满剩余空间 */
.router-view > * {
  min-height: calc(100vh - 60px);
}
</style>