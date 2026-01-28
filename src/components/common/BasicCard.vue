<script setup lang="ts">
  /* Props ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  export interface BasicCardProps {
    interactive?: boolean;
  }

  defineProps<BasicCardProps>();
</script>

<template>
  <div :class="['basic-card', { interactive: interactive }]">
    <slot></slot>
  </div>
</template>

<style scoped>
  .basic-card {
    border: 1px solid color-mix(in srgb, var(--ja-color-purple-400) 35%, transparent);
    border-radius: var(--ja-border-radius-x-large);
    background: linear-gradient(135deg, var(--ja-color-violet-950), var(--ja-color-purple-900));
    box-shadow: 0 0 20px color-mix(in srgb, var(--ja-color-purple-400) 15%, transparent);
    color: var(--ja-color-neutral-100);
    transition:
      box-shadow var(--ja-transition-fast) ease,
      border-color var(--ja-transition-fast) ease;

    &.interactive {
      &:hover {
        border-color: color-mix(in srgb, var(--ja-color-purple-400) 65%, transparent);
        box-shadow: 0 0 16px color-mix(in srgb, var(--ja-color-purple-400) 50%, transparent);
      }
    }
  }
</style>
