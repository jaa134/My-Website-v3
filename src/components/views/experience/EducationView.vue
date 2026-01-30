<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import DownloadIcon from '@/assets/icons/actions/download.svg';
  import CwruIcon from '@/assets/icons/education/cwru.svg';
  import UctIcon from '@/assets/icons/education/uct.svg';

  import BasicCard from '@/components/common/BasicCard.vue';

  /* Education ////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Education {
    link: string;
    icon: typeof import('*.svg').default;
    description: string[];
  }

  const educations: Education[] = [
    {
      link: 'https://case.edu',
      icon: CwruIcon,
      description: [
        'Undergraduate Degree in Computer Science',
        'August 2014 - May 2019',
        'GPA: 3.63 / 4.00',
        'Graduated with honors - Cum Laude',
      ],
    },
    {
      link: 'https://www.uct.ac.za/',
      icon: UctIcon,
      description: [
        'IES Study Abroad Program in South Africa',
        'January 2017 - July 2017',
        'GPA: 4.00 / 4.00',
        'Focus on humanities and social sciences',
      ],
    },
  ];
</script>

<template>
  <div class="education-view">
    <div class="header">
      <div class="header-text">
        <h2 class="title">Education</h2>
        <h3 class="subtitle">How I got my start</h3>
      </div>
      <div class="header-actions">
        <a
          href="/documents/Alspaw-Jacob-Transcript.pdf"
          download
        >
          <button class="action-button">
            <DownloadIcon class="action-button-icon" />
            <span>Download Transcript</span>
          </button>
        </a>
      </div>
    </div>
    <div class="education-grid">
      <a
        v-for="education in educations"
        :key="education.link"
        :href="education.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BasicCard
          class="education-card"
          interactive
        >
          <component
            :is="education.icon"
            class="education-logo"
          />
          <ul class="description-list">
            <li
              v-for="(item, index) in education.description"
              :key="index"
              class="description-item"
            >
              {{ item }}
            </li>
          </ul>
        </BasicCard>
      </a>
    </div>
  </div>
</template>

<style scoped>
  .education-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1100px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    margin-bottom: var(--ja-spacing-x-large);
  }

  .header-text {
    display: flex;
    flex-direction: column;
  }

  .title,
  .subtitle {
    font-weight: var(--ja-font-weight-light);
    line-height: var(--ja-line-height-dense);
    color: var(--ja-color-neutral-300);
  }

  .title {
    font-size: var(--ja-font-size-x-large);
  }

  .subtitle {
    font-size: var(--ja-font-size-medium);
  }

  .action-button {
    display: flex;
    align-items: center;
    gap: var(--ja-spacing-small);
    padding: var(--ja-spacing-x-small) var(--ja-spacing-2x-large);
    border: 1px solid color-mix(in srgb, var(--ja-color-purple-400) 35%, transparent);
    border-radius: var(--ja-border-radius-pill);
    background: linear-gradient(135deg, var(--ja-color-purple-600), var(--ja-color-violet-600));
    color: var(--ja-color-neutral-0);
    font-size: var(--ja-font-size-medium);
    transition:
      box-shadow var(--ja-transition-fast) ease,
      border-color var(--ja-transition-fast) ease;

    &:hover {
      border-color: color-mix(in srgb, var(--ja-color-purple-300) 65%, transparent);
      box-shadow: 0 0 16px color-mix(in srgb, var(--ja-color-purple-400) 50%, transparent);
    }
  }

  .action-button-icon {
    width: 20px;
    height: 20px;
  }

  .education-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--ja-spacing-3x-large);
    width: 100%;
  }

  .education-card {
    display: flex;
    flex-direction: column;
    gap: var(--ja-spacing-x-large);
    padding: var(--ja-spacing-2x-large);
    height: 100%;
  }

  .education-logo {
    height: 70px;
    width: 400px;
  }

  .description-list {
    display: flex;
    flex-direction: column;
    list-style: none;
  }

  .description-item {
    position: relative;
    padding-left: var(--ja-spacing-medium);
    font-size: var(--ja-font-size-medium);
    color: var(--ja-color-neutral-200);

    &::before {
      position: absolute;
      left: 0;
      content: '-';
      color: var(--ja-color-purple-300);
    }
  }
</style>
