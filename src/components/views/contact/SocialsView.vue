<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import FacebookIcon from '@/assets/icons/socials/facebook.svg';
  import GithubIcon from '@/assets/icons/socials/github.svg';
  import InstagramIcon from '@/assets/icons/socials/instagram.svg';
  import LinkedinIcon from '@/assets/icons/socials/linkedin.svg';
  import TwitterIcon from '@/assets/icons/socials/twitter.svg';

  import BasicCard from '@/components/common/BasicCard.vue';
  import SectionHeader from '@/components/common/SectionHeader.vue';

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
    <SectionHeader
      title="Wondering what I'm up to?"
      subtitle="Follow me to receive updates on a regular basis."
      alignment="center"
    />
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
          <div class="social">
            <component
              :is="social.icon"
              class="social-icon"
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
