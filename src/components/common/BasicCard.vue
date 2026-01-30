<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { onBeforeUnmount, onMounted, ref } from 'vue';

  /* Props ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  export interface BasicCardProps {
    interactive?: boolean;
    height?: string;
    minHeight?: string;
    maxHeight?: string;
  }

  withDefaults(defineProps<BasicCardProps>(), {
    interactive: false,
    height: undefined,
    minHeight: undefined,
    maxHeight: undefined,
  });

  /* Scrolling ////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const scrollingElement = ref<HTMLElement>();

  let scrollResizeObserver: ResizeObserver | null = null;

  enum ScrollPosition {
    Top = 'Top',
    Middle = 'Middle',
    Bottom = 'Bottom',
  }

  const scrollPosition = ref<ScrollPosition | null>(null);

  const calculateScrollPosition = () => {
    if (!scrollingElement.value) {
      scrollPosition.value = null;
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = scrollingElement.value;

    if (scrollHeight === clientHeight) {
      scrollPosition.value = null;
    } else if (scrollTop === 0) {
      scrollPosition.value = ScrollPosition.Top;
    } else if (Math.abs(scrollHeight - clientHeight - scrollTop) <= 1) {
      scrollPosition.value = ScrollPosition.Bottom;
    } else {
      scrollPosition.value = ScrollPosition.Middle;
    }
  };

  const scrollTo = (query: string) => {
    const element = scrollingElement.value?.querySelector(query);

    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });

    calculateScrollPosition();
  };

  onMounted(() => {
    calculateScrollPosition();

    scrollResizeObserver = new ResizeObserver(() => {
      calculateScrollPosition();
    });

    if (scrollingElement.value) {
      scrollResizeObserver.observe(scrollingElement.value);
      scrollingElement.value.addEventListener('scroll', calculateScrollPosition);
    }
  });

  onBeforeUnmount(() => {
    scrollResizeObserver?.disconnect();
    scrollingElement.value?.removeEventListener('scroll', calculateScrollPosition);
  });

  /* Expose ///////////////////////////////////////////////////////////////////////////////////////////////////////// */

  defineExpose({
    scrollTo,
  });
</script>

<template>
  <div :class="['basic-card', { interactive }]">
    <div :class="['card-shadow', { active: scrollPosition && scrollPosition !== ScrollPosition.Top }]"></div>
    <div
      ref="scrollingElement"
      class="card-scroller"
    >
      <slot></slot>
    </div>
    <div :class="['card-shadow', { active: scrollPosition && scrollPosition !== ScrollPosition.Bottom }]"></div>
  </div>
</template>

<style scoped>
  .basic-card {
    position: relative;
    overflow: hidden;
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

  .card-scroller {
    width: 100%;
    height: v-bind('height');
    min-height: v-bind('minHeight');
    max-height: v-bind('maxHeight');
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none;
  }

  .card-shadow {
    position: absolute;
    left: -20px;
    right: -20px;
    height: 0;
    transition:
      top var(--ja-transition-medium) ease,
      bottom var(--ja-transition-medium) ease;

    &:first-child {
      top: 0;
      box-shadow: 0 0 65px 20px var(--ja-color-neutral-1000);
    }

    &:last-child {
      bottom: 0;
      box-shadow: 0 0 65px 20px var(--ja-color-neutral-1000);
    }

    &:not(.active) {
      &:first-child {
        top: -70px;
      }

      &:last-child {
        bottom: -70px;
      }
    }
  }
</style>
