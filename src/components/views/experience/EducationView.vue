<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import ActionButton from '@/components/common/ActionButton.vue';
  import BasicCard from '@/components/common/BasicCard.vue';
  import SectionHeader from '@/components/common/SectionHeader.vue';
  import SvgIcon from '@/components/common/SvgIcon.vue';

  /* Education ////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Education {
    name: string;
    link: string;
    icon: string;
    description: string[];
  }

  const educations: Education[] = [
    {
      name: 'Case Western Reserve University',
      link: 'https://case.edu',
      icon: '/icons/education/cwru.svg',
      description: [
        'B.S. in Computer Science',
        'August 2014 - May 2019',
        'GPA: 3.63 / 4.00 - Cum Laude',
        'Awarded best capstone project by faculty',
      ],
    },
    {
      name: 'University of Cape Town',
      link: 'https://www.uct.ac.za/',
      icon: '/icons/education/uct.svg',
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
          <SvgIcon href="/icons/actions/download.svg" />
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
          <div class="education-content">
            <SvgIcon
              class="education-logo"
              :href="education.icon"
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
          </div>
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
    height: 100%;
  }

  .education-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--ja-spacing-x-large);
    padding: var(--ja-spacing-2x-large);
  }

  .education-logo {
    height: 60px;
    width: 350px;
  }

  .description-list {
    display: flex;
    flex-direction: column;
    gap: var(--ja-spacing-2x-small);
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
      content: '•';
      font-weight: var(--ja-font-weight-bold);
      color: var(--ja-color-purple-300);
    }
  }
</style>
