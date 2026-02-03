<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { RouterView } from 'vue-router';

  import PlanetLoadingIndicator from '@/components/common/PlanetLoadingIndicator.vue';
</script>

<template>
  <div class="app-body">
    <Suspense>
      <RouterView />
      <template #fallback>
        <div class="router-loading-container">
          <PlanetLoadingIndicator />
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
  .app-body {
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    min-height: calc(100vh - var(--app-header-height));
  }

  .router-loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
</style>
