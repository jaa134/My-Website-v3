<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import BasicCard from '@/components/common/BasicCard.vue';
  import MainHeader from '@/components/common/MainHeader.vue';
  import SvgIcon from '@/components/common/SvgIcon.vue';

  /* Options //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Option {
    label: string;
    icon: string;
    value: string;
    link: string;
  }

  const options: Option[] = [
    {
      label: 'Phone',
      icon: '/icons/contacts/phone.svg',
      value: '+1 636 699-7344',
      link: 'tel:+16366997344',
    },
    {
      label: 'Email',
      icon: '/icons/contacts/email.svg',
      value: 'dev@jacob-alspaw.com',
      link: 'mailto:dev@jacob-alspaw.com',
    },
    {
      label: 'In Person',
      icon: '/icons/contacts/location.svg',
      value: 'Lakewood, Ohio 44107',
      link: 'https://maps.app.goo.gl/Vvp1AHERZaLUxxiSA',
    },
  ];
</script>

<template>
  <div class="options-view">
    <MainHeader
      title="Looking to get in touch?"
      subtitle="Here's how you can reach me."
    />
    <div class="options-grid">
      <a
        v-for="option in options"
        :key="option.label"
        :href="option.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BasicCard interactive>
          <div class="option">
            <SvgIcon
              class="icon"
              :href="option.icon"
            />
            <div class="text">
              <h4 class="label">{{ option.label }}</h4>
              <span class="value">{{ option.value }}</span>
            </div>
          </div>
        </BasicCard>
      </a>
    </div>
  </div>
</template>

<style scoped>
  .options-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--ja-spacing-3x-large);
    max-width: 1400px;
  }

  .option {
    display: flex;
    align-items: center;
    gap: var(--ja-spacing-medium);
    padding: var(--ja-spacing-large) var(--ja-spacing-x-large);
  }

  .icon {
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

  .text {
    display: flex;
    flex-direction: column;
    gap: var(--ja-spacing-3x-small);
  }

  .label {
    font-size: var(--ja-font-size-medium);
    font-weight: var(--ja-font-weight-semibold);
    letter-spacing: var(--ja-letter-spacing-loose);
    color: var(--ja-color-purple-300);
  }

  .value {
    font-size: var(--ja-font-size-medium);
    color: var(--ja-color-neutral-200);
  }
</style>
