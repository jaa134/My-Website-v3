<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import GalleryView from '@/components/views/about/GalleryView.vue';
  import HobbiesView from '@/components/views/about/HobbiesView.vue';
  import PlacesView from '@/components/views/about/PlacesView.vue';
  import TimelineView from '@/components/views/about/TimelineView.vue';
</script>

<template>
  <div class="about-page">
    <TimelineView />
    <HobbiesView />
    <PlacesView />
    <GalleryView />
  </div>
</template>

<style scoped>
  .about-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--ja-spacing-6x-large);
    padding: var(--ja-spacing-5x-large) var(--ja-spacing-2x-large);
  }
</style>
