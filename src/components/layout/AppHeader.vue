<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

  import { Route } from '@/router/index.js';

  import SvgIcon from '@/components/common/SvgIcon.vue';

  /* Route ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const routes = [Route.Home, Route.About, Route.Experience, Route.Contact];

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

  const linkStyles = computed(() => {
    return {
      activeBackgroundColor: `color-mix(in srgb, var(--ja-color-purple-700) ${100 - scrollProgress.value * 100}%, var(--ja-color-neutral-300) ${scrollProgress.value * 100}%)`,
    };
  });

  const callToActionButtonStyles = computed(() => {
    return {
      borderColor: `color-mix(in srgb, var(--ja-color-purple-700) ${100 - scrollProgress.value * 100}%, var(--ja-color-neutral-300) ${scrollProgress.value * 100}%)`,
      borderColorHover: `color-mix(in srgb, var(--ja-color-purple-400) ${100 - scrollProgress.value * 100}%, var(--ja-color-neutral-0) ${scrollProgress.value * 100}%)`,
    };
  });
</script>

<template>
  <div class="app-header">
    <div class="app-header-content">
      <div class="section title">
        <SvgIcon
          class="logo"
          href="/icons/logos/main.svg"
        />
        <h1 class="name">Jacob Alspaw</h1>
      </div>
      <div class="section navigation">
        <RouterLink
          v-for="route in routes"
          :key="route"
          :to="{ name: route }"
        >
          {{ route }}
        </RouterLink>
      </div>
      <div class="section call-to-action">
        <RouterLink :to="{ name: Route.Contact }">
          <button>Let's work together</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .app-header {
    position: sticky;
    top: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--app-header-height);
    min-height: var(--app-header-height);
    border-bottom: 1px solid v-bind('appHeaderStyles.borderBottomColor');
    background-color: v-bind('appHeaderStyles.backgroundColor');
    backdrop-filter: v-bind('appHeaderStyles.backdropFilter');
    transition:
      border-bottom-color var(--ja-transition-fast) ease,
      background-color var(--ja-transition-fast) ease,
      backdrop-filter var(--ja-transition-fast) ease;
  }

  .app-header-content {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 600px 1fr;
    grid-template-rows: 1fr;
    gap: var(--ja-spacing-x-large);
    padding: 0 var(--ja-spacing-x-large);
    max-width: 1700px;
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
      position: relative;
      display: inline-block;
      padding: var(--ja-spacing-small) var(--ja-spacing-medium);
      font-size: var(--ja-font-size-large);
      font-weight: var(--ja-font-weight-semibold);
      font-family: var(--ja-font-mono);

      &::after {
        content: '';
        position: absolute;
        left: var(--ja-spacing-medium);
        right: var(--ja-spacing-medium);
        bottom: calc(var(--ja-spacing-x-small));
        height: 2px;
        background-color: v-bind('linkStyles.activeBackgroundColor');
        transform: scaleX(0);
        transform-origin: center;
        transition:
          background-color var(--ja-transition-fast) ease-in-out,
          transform var(--ja-transition-fast) ease;
      }

      &.router-link-active::after {
        transform: scaleX(1);
      }
    }
  }

  .call-to-action {
    button {
      padding: var(--ja-spacing-x-small) var(--ja-spacing-x-large);
      background: transparent;
      border: 2px solid v-bind('callToActionButtonStyles.borderColor');
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
