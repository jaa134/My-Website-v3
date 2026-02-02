<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import SvgIcon from '@/components/common/SvgIcon.vue';

  /* Props ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  export interface PageControlsProps {
    pageCount: number;
  }

  const props = defineProps<PageControlsProps>();

  /* Model ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const page = defineModel({
    type: Number,
    required: true,
  });

  /* Methods //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const goToPage = (index: number) => {
    page.value = (index + props.pageCount) % props.pageCount;
  };
</script>

<template>
  <div class="page-controls">
    <button
      class="navigation-button"
      @click="goToPage(page - 1)"
    >
      <SvgIcon href="/icons/actions/previous.svg" />
    </button>
    <div class="dots-container">
      <button
        v-for="index in pageCount"
        :key="index"
        :class="['dot', { current: page === index - 1 }]"
        @click="goToPage(index - 1)"
      ></button>
    </div>
    <button
      class="navigation-button"
      @click="goToPage(page + 1)"
    >
      <SvgIcon href="/icons/actions/next.svg" />
    </button>
  </div>
</template>

<style scoped>
  .page-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--ja-spacing-large);
  }

  .navigation-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px solid color-mix(in srgb, var(--ja-color-purple-400) 35%, transparent);
    border-radius: var(--ja-border-radius-circle);
    background: transparent;
    color: var(--ja-color-neutral-300);

    &:hover {
      border-color: color-mix(in srgb, var(--ja-color-purple-400) 65%, transparent);
      background-color: color-mix(in srgb, var(--ja-color-purple-400) 15%, transparent);
      color: var(--ja-color-neutral-0);
    }

    .svg-icon {
      width: 20px;
      height: 20px;
    }
  }

  .dots-container {
    display: flex;
    align-items: center;
    gap: var(--ja-spacing-small);
  }

  .dot {
    width: 10px;
    height: 10px;
    border: none;
    border-radius: var(--ja-border-radius-circle);
    background-color: var(--ja-color-neutral-500);
    cursor: pointer;
    transition: background-color var(--ja-transition-fast) ease transform var(--ja-transition-fast) ease;

    &:hover {
      background-color: color-mix(in srgb, var(--ja-color-purple-400) 50%, transparent);
      transform: scale(1.2);
    }

    &.current {
      background-color: var(--ja-color-purple-400);
      transform: scale(1.3);
    }
  }
</style>
