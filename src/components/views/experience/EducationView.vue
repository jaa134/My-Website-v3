<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import DownloadIcon from '@/assets/icons/actions/download.svg';
  import CwruIcon from '@/assets/icons/education/cwru.svg';
  import UctIcon from '@/assets/icons/education/uct.svg';

  import ActionButton from '@/components/common/ActionButton.vue';
  import BasicCard from '@/components/common/BasicCard.vue';
  import SectionHeader from '@/components/common/SectionHeader.vue';

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
    <SectionHeader
      title="Education"
      subtitle="How I got my start"
    >
      <a
        href="/documents/Alspaw-Jacob-Transcript.pdf"
        download
      >
        <ActionButton>
          <DownloadIcon />
          <span>Download Transcript</span>
        </ActionButton>
      </a>
    </SectionHeader>
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
