<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import AchievementsView from '@/components/views/experience/AchievementsView.vue';
  import CareerView from '@/components/views/experience/CareerView.vue';
  import EducationView from '@/components/views/experience/EducationView.vue';
  import PortfolioView from '@/components/views/experience/PortfolioView.vue';
  import SkillsView from '@/components/views/experience/SkillsView.vue';
</script>

<template>
  <div class="experience-page">
    <CareerView />
    <AchievementsView />
    <EducationView />
    <SkillsView />
    <PortfolioView />
  </div>
</template>

<style scoped>
  .experience-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--ja-spacing-6x-large);
    padding: var(--ja-spacing-6x-large) var(--ja-spacing-large);
  }
</style>
