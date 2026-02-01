<script setup lang="ts">
  /* Props ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  export interface SectionHeaderProps {
    title: string;
    subtitle: string;
  }

  defineProps<SectionHeaderProps>();
</script>

<template>
  <div class="main-header">
    <h2 class="title">{{ title }}</h2>
    <h3 class="subtitle">{{ subtitle }}</h3>
  </div>
</template>

<style scoped>
  .main-header {
    margin-bottom: var(--ja-spacing-2x-large);
    text-align: center;
  }

  .title {
    font-size: var(--ja-font-size-2x-large);
    font-weight: var(--ja-font-weight-light);
    line-height: var(--ja-line-height-dense);
    color: var(--ja-color-neutral-200);
  }

  .subtitle {
    font-size: var(--ja-font-size-large);
    font-weight: var(--ja-font-weight-normal);
    line-height: var(--ja-line-height-normal);
    color: var(--ja-color-neutral-300);
  }
</style>
