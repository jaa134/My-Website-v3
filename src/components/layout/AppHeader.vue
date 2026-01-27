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
      <button>Let's work together</button>
    </div>
  </div>
</template>

<style scoped>
  .app-header {
    position: sticky;
    top: 0;
    height: 100px;
    min-height: 100px;
    background: red;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
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
      gap: var(--ja-spacing-x-large);
    }

    &.call-to-action {
      justify-content: flex-end;
    }
  }

  .logo {
    width: 60px;
    height: 60px;
  }
</style>
