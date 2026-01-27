<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import AppBody from '@/components/layout/AppBody.vue';
  import AppFooter from '@/components/layout/AppFooter.vue';
  import AppHeader from '@/components/layout/AppHeader.vue';
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
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
</style>
