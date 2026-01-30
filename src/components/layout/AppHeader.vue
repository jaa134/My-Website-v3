<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

  import LogoIcon from '@/assets/icons/logos/main.svg';

  import { Route } from '@/router/index.js';

  /* Scroll tracking //////////////////////////////////////////////////////////////////////////////////////////////// */

  const scrollY = ref(0);

  const handleScroll = () => {
    scrollY.value = window.scrollY;
  };

  const fullColorScrollDistance = 300;
  const scrollProgress = computed(() => Math.min(scrollY.value / fullColorScrollDistance, 1));

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  /* Styling //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const appHeaderStyles = computed(() => {
    return {
      backgroundColor: `color-mix(in srgb, var(--ja-color-purple-900) ${scrollProgress.value * 100}%, transparent)`,
      borderBottomColor: `color-mix(in srgb, var(--ja-color-violet-400) ${scrollProgress.value * 20}%, transparent)`,
      backdropFilter: `blur(${scrollProgress.value * 10}px)`,
    };
  });

  const callToActionButtonStyles = computed(() => {
    return {
      borderColor: `color-mix(in srgb, var(--ja-color-purple-600) ${100 - scrollProgress.value * 100}%, var(--ja-color-neutral-300) ${scrollProgress.value * 100}%)`,
      borderColorHover: `color-mix(in srgb, var(--ja-color-purple-400) ${100 - scrollProgress.value * 100}%, var(--ja-color-neutral-0) ${scrollProgress.value * 100}%)`,
    };
  });
</script>

<template>
  <div class="app-header">
    <div class="section title">
      <LogoIcon class="logo" />
      <h1 class="name">J. Alspaw</h1>
    </div>
    <div class="section navigation">
      <RouterLink :to="{ name: Route.Home }">Home</RouterLink>
      <RouterLink :to="{ name: Route.About }">About</RouterLink>
      <RouterLink :to="{ name: Route.Experience }">Experience</RouterLink>
      <RouterLink :to="{ name: Route.Contact }">Contact</RouterLink>
    </div>
    <div class="section call-to-action">
      <RouterLink :to="{ name: Route.Contact }">
        <button>Let's work together</button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
  .app-header {
    position: sticky;
    top: 0;
    z-index: 999;
    height: 100px;
    min-height: 100px;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: 1fr;
    gap: var(--ja-spacing-x-large);
    padding: 0 var(--ja-spacing-x-large);
    border-bottom: 1px solid v-bind('appHeaderStyles.borderBottomColor');
    background-color: v-bind('appHeaderStyles.backgroundColor');
    backdrop-filter: v-bind('appHeaderStyles.backdropFilter');
    transition:
      background-color var(--ja-transition-fast) ease,
      backdrop-filter var(--ja-transition-fast) ease,
      border-bottom-color var(--ja-transition-fast) ease;
  }

  .section {
    display: flex;
    align-items: center;

    &.title {
      justify-content: flex-start;
      gap: var(--ja-spacing-large);
    }

    &.navigation {
      justify-content: center;
      gap: var(--ja-spacing-3x-large);
    }

    &.call-to-action {
      justify-content: flex-end;
    }
  }

  .title {
    .logo {
      width: 60px;
      height: 60px;
    }

    .name {
      font-size: var(--ja-font-size-x-large);
      font-weight: var(--ja-font-weight-normal);
      font-family: var(--ja-font-mono);
    }
  }

  .navigation {
    a {
      display: inline-block;
      padding: var(--ja-spacing-small) var(--ja-spacing-medium);
      font-size: var(--ja-font-size-large);
      font-weight: var(--ja-font-weight-semibold);
      font-family: var(--ja-font-mono);
    }
  }

  .call-to-action {
    button {
      padding: var(--ja-spacing-x-small) var(--ja-spacing-x-large);
      background: transparent;
      border: 1px solid v-bind('callToActionButtonStyles.borderColor');
      border-radius: var(--ja-border-radius-pill);
      font-size: var(--ja-font-size-large);
      font-weight: var(--ja-font-weight-semibold);
      font-family: var(--ja-font-mono);

      &:hover {
        border-color: v-bind('callToActionButtonStyles.borderColorHover');
      }
    }
  }
</style>
