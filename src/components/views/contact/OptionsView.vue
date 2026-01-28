<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import EmailIcon from '@/assets/icons/contacts/email.svg';
  import LocationIcon from '@/assets/icons/contacts/location.svg';
  import PhoneIcon from '@/assets/icons/contacts/phone.svg';

  /* Options //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Option {
    label: string;
    icon: typeof import('*.svg').default;
    value: string;
    link: string;
  }

  const options: Option[] = [
    {
      label: 'Phone',
      icon: PhoneIcon,
      value: '+1 636 699-7344',
      link: 'tel:+16366997344',
    },
    {
      label: 'Email',
      icon: EmailIcon,
      value: 'dev@jacob-alspaw.com',
      link: 'mailto:dev@jacob-alspaw.com',
    },
    {
      label: 'In Person',
      icon: LocationIcon,
      value: 'Lakewood, Ohio 44107',
      link: 'https://maps.app.goo.gl/Vvp1AHERZaLUxxiSA',
    },
  ];
</script>

<template>
  <div class="options-view">
    <div class="header">
      <h2 class="title">Looking to get in touch?</h2>
      <h3 class="subtitle">Here's how you can reach me.</h3>
    </div>
    <div class="options-grid">
      <a
        v-for="option in options"
        :key="option.label"
        class="option-card"
        :href="option.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <component
          :is="option.icon"
          class="option-icon"
        />
        <div class="option-text">
          <h4 class="option-label">{{ option.label }}</h4>
          <span class="option-value">{{ option.value }}</span>
        </div>
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

  .options-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--ja-spacing-3x-large);
    max-width: 1400px;
  }

  .option-card {
    display: flex;
    align-items: center;
    gap: var(--ja-spacing-medium);
    padding: var(--ja-spacing-large) var(--ja-spacing-x-large);
    border-radius: var(--ja-border-radius-x-large);
    background: linear-gradient(135deg, var(--ja-color-violet-950), var(--ja-color-purple-900));
    border: 1px solid color-mix(in srgb, var(--ja-color-purple-400) 35%, transparent);
    box-shadow: 0 0 20px color-mix(in srgb, var(--ja-color-purple-400) 15%, transparent);
    transition:
      box-shadow var(--ja-transition-fast) ease,
      border-color var(--ja-transition-fast) ease;

    &:hover {
      border-color: color-mix(in srgb, var(--ja-color-purple-300) 55%, transparent);
      box-shadow: 0 0 28px color-mix(in srgb, var(--ja-color-purple-300) 25%, transparent);
    }
  }

  .option-icon {
    width: var(--ja-spacing-3x-large);
    height: var(--ja-spacing-3x-large);
    display: block;
    flex-shrink: 0;
    padding: var(--ja-spacing-x-small);
    border-radius: var(--ja-border-radius-large);
    background: color-mix(in srgb, var(--ja-color-purple-900) 70%, transparent);
    color: var(--ja-color-purple-400);
    box-shadow: inset 0 0 10px color-mix(in srgb, var(--ja-color-purple-400) 20%, transparent);
  }

  .option-text {
    display: flex;
    flex-direction: column;
    gap: var(--ja-spacing-3x-small);
  }

  .option-label {
    font-size: var(--ja-font-size-medium);
    font-weight: var(--ja-font-weight-semibold);
    letter-spacing: var(--ja-letter-spacing-loose);
    color: var(--ja-color-purple-300);
  }

  .option-value {
    font-size: var(--ja-font-size-medium);
    color: var(--ja-color-neutral-100);
  }
</style>
