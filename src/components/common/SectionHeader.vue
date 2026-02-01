<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { computed } from 'vue';

  /* Props ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  export interface SectionHeaderProps {
    title: string;
    subtitle: string;
    alignment?: 'left' | 'center' | 'right';
  }

  const props = withDefaults(defineProps<SectionHeaderProps>(), {
    alignment: 'left',
  });

  /* Alignment ////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const justifyContent = computed(() => {
    switch (props.alignment) {
      case 'left': {
        return 'flex-start';
      }
      case 'center': {
        return 'center';
      }
      case 'right': {
        return 'flex-end';
      }
      default: {
        return undefined;
      }
    }
  });

  const textAlign = computed(() => {
    switch (props.alignment) {
      case 'left': {
        return 'left';
      }
      case 'center': {
        return 'center';
      }
      case 'right': {
        return 'right';
      }
      default: {
        return undefined;
      }
    }
  });
</script>

<template>
  <div class="section-header">
    <div class="text">
      <h2 class="title">{{ title }}</h2>
      <h3 class="subtitle">{{ subtitle }}</h3>
    </div>
    <div class="actions">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .section-header {
    display: flex;
    justify-content: v-bind('justifyContent');
    align-items: flex-end;
    width: 100%;
    margin-bottom: var(--ja-spacing-2x-large);
  }

  .text {
    display: flex;
    flex-direction: column;
  }

  .title,
  .subtitle {
    text-align: v-bind('textAlign');
    font-weight: var(--ja-font-weight-light);
    line-height: var(--ja-line-height-dense);
    color: var(--ja-color-neutral-200);
  }

  .title {
    font-size: var(--ja-font-size-x-large);
  }

  .subtitle {
    font-size: var(--ja-font-size-medium);
  }

  .actions {
    margin-left: auto;

    &:empty {
      display: none;
    }
  }
</style>
