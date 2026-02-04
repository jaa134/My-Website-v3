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
        name="page-change"
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

  .page-change-enter-active,
  .page-change-leave-active {
    transition: opacity var(--ja-transition-fast) ease;
    will-change: opacity;
  }

  .page-change-enter-from {
    opacity: 0;
  }

  .page-change-enter-to {
    opacity: 1;
  }

  .page-change-leave-from {
    opacity: 1;
  }

  .page-change-leave-to {
    opacity: 0;
  }
</style>
