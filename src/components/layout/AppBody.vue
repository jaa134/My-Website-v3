<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { RouterView } from 'vue-router';

  import { useRouterLoading } from '@/composables/useRouterLoading.js';

  import PlanetLoadingIndicator from '@/components/common/PlanetLoadingIndicator.vue';

  /* Router loading ///////////////////////////////////////////////////////////////////////////////////////////////// */

  const routerLoading = useRouterLoading();
</script>

<template>
  <div class="app-body">
    <RouterView v-slot="{ Component }">
      <Transition
        name="fade"
        mode="out-in"
      >
        <PlanetLoadingIndicator v-if="routerLoading" />
        <component
          :is="Component"
          v-else
        />
      </Transition>
    </RouterView>
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
</style>
