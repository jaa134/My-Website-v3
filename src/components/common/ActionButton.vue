<script setup lang="ts">
  /* Props ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  export interface ActionButtonProps {
    loading?: boolean;
    disabled?: boolean;
  }

  defineProps<ActionButtonProps>();
</script>

<template>
  <button
    :class="['action-button', { loading }]"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
  .action-button {
    display: inline-flex;
    align-items: center;
    gap: var(--ja-spacing-small);
    padding: var(--ja-spacing-x-small) var(--ja-spacing-2x-large);
    border: 1px solid color-mix(in srgb, var(--ja-color-purple-400) 35%, transparent);
    border-radius: var(--ja-border-radius-pill);
    background: linear-gradient(135deg, var(--ja-color-purple-600), var(--ja-color-violet-600));
    color: var(--ja-color-neutral-0);
    font-size: var(--ja-font-size-medium);
    transition:
      box-shadow var(--ja-transition-fast) ease,
      border-color var(--ja-transition-fast) ease;

    &:hover {
      border-color: color-mix(in srgb, var(--ja-color-purple-300) 65%, transparent);
      box-shadow: 0 0 16px color-mix(in srgb, var(--ja-color-purple-400) 50%, transparent);
    }

    &:disabled {
      box-shadow: none;
      cursor: not-allowed;
    }

    &.loading {
      cursor: progress;
    }

    &:deep(svg) {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
    }
  }
</style>
