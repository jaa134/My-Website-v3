<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import BasicCard from '@/components/common/BasicCard.vue';
  import SectionHeader from '@/components/common/SectionHeader.vue';
  import SvgIcon from '@/components/common/SvgIcon.vue';

  /* Socials //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Social {
    name: string;
    handle: string;
    link: string;
    icon: string;
  }

  const socials: Social[] = [
    {
      name: 'LinkedIn',
      handle: '@Jacob Alspaw',
      link: 'https://www.linkedin.com/in/jacob-alspaw',
      icon: '/icons/socials/linkedin.svg',
    },
    {
      name: 'GitHub',
      handle: '@jaa134',
      link: 'https://github.com/jaa134',
      icon: '/icons/socials/github.svg',
    },
    {
      name: 'Facebook',
      handle: '@jacobalexander.alspaw',
      link: 'https://www.facebook.com/jacobalexander.alspaw',
      icon: '/icons/socials/facebook.svg',
    },
    {
      name: 'Instagram',
      handle: '@jacobalspaw',
      link: 'https://www.instagram.com/jacobalspaw/',
      icon: '/icons/socials/instagram.svg',
    },
    {
      name: 'Twitter',
      handle: '@JacobAlspaw',
      link: 'https://twitter.com/JacobAlspaw',
      icon: '/icons/socials/twitter.svg',
    },
  ];
</script>

<template>
  <div class="socials-view">
    <SectionHeader
      title="Wondering what I'm up to?"
      subtitle="Follow me to receive updates on a regular basis."
      alignment="center"
    />
    <div class="socials-grid">
      <a
        v-for="social in socials"
        :key="social.name"
        :href="social.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BasicCard
          class="social-card"
          interactive
        >
          <div class="social">
            <SvgIcon
              class="social-icon"
              :href="social.icon"
            />
            <span class="social-handle">{{ social.handle }}</span>
          </div>
        </BasicCard>
      </a>
    </div>
  </div>
</template>

<style scoped>
  .socials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--ja-spacing-x-large);
    max-width: 1400px;
  }

  .social {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--ja-spacing-small);
    padding: var(--ja-spacing-x-large);
  }

  .social-icon {
    width: 40px;
    height: 40px;
    color: var(--ja-color-purple-200);
  }

  .social-handle {
    font-size: var(--ja-font-size-small);
    color: var(--ja-color-neutral-100);
  }
</style>
