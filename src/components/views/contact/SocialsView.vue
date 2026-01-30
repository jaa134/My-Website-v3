<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import FacebookIcon from '@/assets/icons/socials/facebook.svg';
  import GithubIcon from '@/assets/icons/socials/github.svg';
  import InstagramIcon from '@/assets/icons/socials/instagram.svg';
  import LinkedinIcon from '@/assets/icons/socials/linkedin.svg';
  import TwitterIcon from '@/assets/icons/socials/twitter.svg';

  import BasicCard from '@/components/common/BasicCard.vue';

  /* Socials //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Social {
    name: string;
    handle: string;
    url: string;
    icon: typeof import('*.svg').default;
  }

  const socials: Social[] = [
    {
      name: 'LinkedIn',
      handle: '@Jacob Alspaw',
      url: 'https://www.linkedin.com/in/jacob-alspaw',
      icon: LinkedinIcon,
    },
    {
      name: 'GitHub',
      handle: '@jaa134',
      url: 'https://github.com/jaa134',
      icon: GithubIcon,
    },
    {
      name: 'Facebook',
      handle: '@jacobalexander.alspaw',
      url: 'https://www.facebook.com/jacobalexander.alspaw',
      icon: FacebookIcon,
    },
    {
      name: 'Instagram',
      handle: '@jacobalspaw',
      url: 'https://www.instagram.com/jacobalspaw/',
      icon: InstagramIcon,
    },
    {
      name: 'Twitter',
      handle: '@JacobAlspaw',
      url: 'https://twitter.com/JacobAlspaw',
      icon: TwitterIcon,
    },
  ];
</script>

<template>
  <div class="socials-view">
    <div class="header">
      <h2 class="title">Wondering what I'm up to?</h2>
      <h3 class="subtitle">Follow me to receive updates on a regular basis.</h3>
    </div>
    <div class="socials-grid">
      <a
        v-for="social in socials"
        :key="social.name"
        :href="social.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BasicCard
          class="social-card"
          interactive
        >
          <component
            :is="social.icon"
            class="social-icon"
          />
          <span class="social-handle">{{ social.handle }}</span>
        </BasicCard>
      </a>
    </div>
  </div>
</template>

<style scoped>
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: var(--ja-spacing-2x-large);
  }

  .title,
  .subtitle {
    font-weight: var(--ja-font-weight-light);
    line-height: var(--ja-line-height-dense);
    color: var(--ja-color-neutral-300);
    text-align: center;
  }

  .title {
    font-size: var(--ja-font-size-x-large);
  }

  .subtitle {
    font-size: var(--ja-font-size-medium);
  }

  .socials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--ja-spacing-x-large);
    max-width: 1400px;
  }

  .social-card {
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
