<script setup lang="ts" generic="T extends { id: string }">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { PropType } from 'vue';

  import BasicCard from '@/components/common/BasicCard.vue';

  /* Props ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  defineProps<{
    options: T[];
    height?: string;
    minHeight?: string;
    maxHeight?: string;
  }>();

  /* Model ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const selectedOption = defineModel<T>({
    type: Object as PropType<T>,
    required: true,
  });

  /* Methods //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const selectOption = (option: T) => {
    selectedOption.value = option;
  };
</script>

<template>
  <BasicCard
    class="selection-menu"
    :height="height"
    :min-height="minHeight"
    :max-height="maxHeight"
  >
    <div class="navigation-items">
      <button
        v-for="option in options"
        :key="option.id"
        :class="['navigation-item', { active: option.id === selectedOption.id }]"
        @click="selectOption(option)"
      >
        <div class="selection-indicator">
          <div class="selection-indicator-fill"></div>
        </div>
        <span class="selection-text">{{ option.id }}</span>
      </button>
    </div>
  </BasicCard>
</template>

<style scoped>
  .navigation-items {
    display: flex;
    flex-direction: column;
    gap: var(--ja-spacing-3x-small);
    padding: var(--ja-spacing-large);
  }

  .navigation-item {
    display: flex;
    align-items: center;
    gap: var(--ja-spacing-medium);
    padding: var(--ja-spacing-medium) var(--ja-spacing-small) var(--ja-spacing-medium) var(--ja-spacing-medium);
    border: none;
    border-radius: var(--ja-border-radius-x-large);
    background: transparent;
    color: var(--ja-color-neutral-100);
    transition: background-color var(--ja-transition-fast) ease;

    &:hover,
    &.active {
      background-color: color-mix(in srgb, var(--ja-color-purple-400) 15%, transparent);
    }

    &.active {
      .selection-indicator {
        border-color: var(--ja-color-purple-400);
      }

      .selection-indicator-fill {
        opacity: 1;
      }

      .selection-text {
        color: var(--ja-color-neutral-0);
      }
    }
  }

  .selection-indicator {
    width: 20px;
    height: 20px;
    border-radius: var(--ja-border-radius-circle);
    border: 2px solid var(--ja-color-neutral-400);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color var(--ja-transition-fast) ease;
  }

  .selection-indicator-fill {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--ja-color-purple-400);
    opacity: 0;
    transition: opacity var(--ja-transition-fast) ease;
  }

  .selection-text {
    font-size: var(--ja-font-size-medium);
    color: var(--ja-color-neutral-300);
    transition: color var(--ja-transition-fast) ease;
  }
</style>
