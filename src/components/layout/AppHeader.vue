<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { Route } from '@/router/index.js';
</script>

<template>
  <div class="app-header">
    <div class="section title">
      <img
        class="logo"
        src="/assets/images/logo.svg"
      />
      <div class="name">J. Alspaw</div>
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
    height: 100px;
    min-height: 100px;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: 1fr;
    gap: var(--ja-spacing-x-large);
    padding: 0 var(--ja-spacing-x-large);
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
      border: 1px solid var(--ja-color-purple-600);
      border-radius: var(--ja-border-radius-pill);
      font-size: var(--ja-font-size-large);
      font-weight: var(--ja-font-weight-semibold);
      font-family: var(--ja-font-mono);

      &:hover {
        border-color: var(--ja-color-purple-400);
      }
    }
  }
</style>
