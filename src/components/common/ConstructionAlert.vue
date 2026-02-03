<script setup lang="ts">
  /* Props ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  export interface ConstructionAlertProps {
    title?: string;
    message?: string;
  }

  withDefaults(defineProps<ConstructionAlertProps>(), {
    title: 'Under Construction',
    message:
      "I'm actively building this space and iterating in public. Some pages are rough around the edges, but the foundation is in place and updates are landing regularly.",
  });
</script>

<template>
  <div class="construction-alert">
    <div class="header">
      <h2 class="title">{{ title }}</h2>
      <div class="badge">In Progress</div>
    </div>
    <p class="message">{{ message }}</p>
  </div>
</template>

<style scoped>
  .construction-alert {
    padding: var(--ja-spacing-large) var(--ja-spacing-x-large);
    border-radius: var(--ja-border-radius-large);
    background: color-mix(in srgb, var(--ja-color-purple-900) 50%, transparent);
    box-shadow: 0 0 12px color-mix(in srgb, var(--ja-color-purple-400) 12%, transparent);
    color: var(--ja-color-neutral-100);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--ja-spacing-medium);
    margin-bottom: var(--ja-spacing-x-small);
  }

  .badge {
    padding: var(--ja-spacing-2x-small) var(--ja-spacing-small) 0 var(--ja-spacing-small);
    border-radius: var(--ja-border-radius-pill);
    border: 1px solid color-mix(in srgb, var(--ja-color-purple-400) 35%, transparent);
    background: color-mix(in srgb, var(--ja-color-purple-900) 70%, transparent);
    font-family: var(--ja-font-mono);
    font-size: var(--ja-font-size-x-small);
    letter-spacing: var(--ja-letter-spacing-loose);
    text-transform: uppercase;
  }

  .title {
    font-family: var(--ja-font-mono);
    font-size: var(--ja-font-size-medium);
    font-weight: var(--ja-font-weight-semibold);
    color: var(--ja-color-neutral-0);
  }

  .message {
    font-size: var(--ja-font-size-small);
    color: var(--ja-color-neutral-200);
  }
</style>
