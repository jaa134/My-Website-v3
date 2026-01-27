<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import IntroductionView from '@/components/views/home/IntroductionView.vue';
</script>

<template>
  <div class="home-page">
    <IntroductionView />
  </div>
</template>

<style scoped>
  .home-page {
    display: flex;
    flex-direction: column;
    gap: var(--ja-spacing-4x-large);
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--ja-spacing-4x-large) 0 var(--ja-spacing-5x-large) 0;
  }
</style>
