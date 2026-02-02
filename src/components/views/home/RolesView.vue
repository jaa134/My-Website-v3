<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import BasicCard from '@/components/common/BasicCard.vue';

  /* Roles ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Role {
    title: string;
    description: string;
  }

  const roles: Role[] = [
    {
      title: 'Frontend Developer',
      description:
        'Crafting intuitive user interfaces with modern web technologies. Transforming designs into responsive, performant applications.',
    },
    {
      title: 'Team Lead',
      description:
        'Leading development teams and architecting scalable solutions. Mentoring developers and driving technical excellence.',
    },
    {
      title: 'Satellite Operator',
      description: 'Operating satellites and monitoring space systems. Bridging the gap between Earth and orbit.',
    },
  ];
</script>

<template>
  <div class="roles-view">
    <BasicCard
      v-for="role in roles"
      :key="role.title"
    >
      <div class="role">
        <h3 class="title">{{ role.title }}</h3>
        <p class="description">
          {{ role.description }}
        </p>
      </div>
    </BasicCard>
  </div>
</template>

<style scoped>
  .roles-view {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--ja-spacing-2x-large) var(--ja-spacing-3x-large);
    max-width: 1400px;
  }

  .role {
    padding: var(--ja-spacing-2x-large) var(--ja-spacing-3x-large);
  }

  .title {
    font-family: var(--ja-font-mono);
    font-size: var(--ja-font-size-large);
    font-weight: var(--ja-font-weight-semibold);
    color: var(--ja-color-violet-200);
    margin-bottom: var(--ja-spacing-large);
  }

  .description {
    font-size: var(--ja-font-size-medium);
    font-weight: var(--ja-font-weight-light);
    color: var(--ja-color-neutral-200);
  }
</style>
