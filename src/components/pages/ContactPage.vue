<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import FormView from '@/components/views/contact/FormView.vue';
  import GlobeView from '@/components/views/contact/GlobeView.vue';
  import OptionsView from '@/components/views/contact/OptionsView.vue';
  import SocialsView from '@/components/views/contact/SocialsView.vue';
</script>

<template>
  <div class="contact-page">
    <OptionsView />
    <FormView />
    <SocialsView />
    <GlobeView />
  </div>
</template>

<style scoped>
  .contact-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--ja-spacing-6x-large);
    padding: var(--ja-spacing-5x-large) var(--ja-spacing-2x-large);
  }
</style>
