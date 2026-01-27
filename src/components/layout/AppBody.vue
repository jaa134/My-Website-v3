<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import '@/styles/index.css';

  import { RouterView } from 'vue-router';
</script>

<template>
  <div class="app-body">
    <RouterView />
  </div>
</template>

<style scoped>
  .app-body {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: blue;
  }
</style>
