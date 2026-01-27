<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import AppHeader from '@/components/layout/AppHeader.vue';
  import AppBody from '@/components/layout/AppBody.vue';
  import AppFooter from '@/components/layout/AppFooter.vue';
  import StarryBackground from '@/components/layout/StarryBackground.vue';
</script>

<template>
  <div class="app">
    <StarryBackground />
    <AppHeader />
    <AppBody />
    <AppFooter />
  </div>
</template>

<style scoped>
  .app {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
</style>
