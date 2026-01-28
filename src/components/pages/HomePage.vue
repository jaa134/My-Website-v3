<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import GlobeView from '@/components/views/home/GlobeView.vue';
  import HeroView from '@/components/views/home/HeroView.vue';
  import RolesView from '@/components/views/home/RolesView.vue';
</script>

<template>
  <div class="home-page">
    <HeroView />
    <RolesView />
    <GlobeView />
  </div>
</template>

<style scoped>
  .home-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--ja-spacing-6x-large);
    padding: var(--ja-spacing-6x-large) var(--ja-spacing-2x-large);
  }
</style>
