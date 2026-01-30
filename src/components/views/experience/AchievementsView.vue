<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

  import BasicCard from '@/components/common/BasicCard.vue';
  import PageControls from '@/components/common/PageControls.vue';
  import SectionHeader from '@/components/common/SectionHeader.vue';

  /* Achievements //////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Achievement {
    date: string;
    summary: string;
    description: string;
  }

  const achievements: Achievement[] = [
    {
      date: '2022 - Present',
      summary: 'Satellite Pilot Certification',
      description:
        'Piloted and controlled satellites in orbit after completing satellite pilot training and certification. Routinely assists with anomaly response to maintain mission continuity.',
    },
    {
      date: '2019 - 2022',
      summary: '90% Defect Reduction',
      description: 'Reduced known UI defects in our product backlog by over 90% in less than 10 months.',
    },
    {
      date: '2024-2026',
      summary: 'Vue Migration',
      description: 'Migrated 650+ components from Vue 2 to Vue 3, modernizing tooling and reducing maintenance risk.',
    },
    {
      date: '2020',
      summary: '125x Performance Improvement',
      description:
        'Identified and fixed various performance traps that resulted in web pages rendering up to 125x faster.',
    },
    {
      date: '2019 - 2022',
      summary: 'Frontend Team Management',
      description:
        'Managed a small team of developers responsible for producing, maintaining, and modifying web front-end code for enterprise level software.',
    },
    {
      date: '2019 - 2022',
      summary: 'High-Profile Client Relations',
      description:
        'Maintained personal relationships with high-profile customer accounts that need a dedicated advocate to meet SLA on issues that impact millions of dollars in financial investments.',
    },
    {
      date: '2019 - 2022',
      summary: 'Distinguished Performances',
      description:
        'Exceeded expectations and received distinguished honors during all performance reviews as a full-stack developer and front-end lead at IBM UrbanCode and HCL Software.',
    },
    {
      date: '2018',
      summary: 'Grant Recipient',
      description:
        'Awarded a $25,000 grant from the Innovation Fund to continue development of medical diagnostic equipment.',
    },
    {
      date: '2019',
      summary: 'EECS Department Award',
      description:
        'Recognized by the electrical engineering and computer science department for the most outstanding capstone project.',
    },
    {
      date: '2016 - 2019',
      summary: 'Company Founder',
      description:
        'Devised a data-driven service, website, and mobile application with senior university faculty to compute and convey real-time "busyness" metrics for various locations around campus.',
    },
  ];

  /* Slideshow ////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Slide {
    position: 'prev' | 'current' | 'next';
    index: number;
    data: Achievement;
  }

  const currentIndex = ref(0);

  const slides = computed<Slide[]>(() => {
    const previousIndex = (currentIndex.value + achievements.length - 1) % achievements.length;
    const nextIndex = (currentIndex.value + achievements.length + 1) % achievements.length;

    return [
      {
        position: 'prev',
        index: previousIndex,
        data: achievements[previousIndex]!,
      },
      {
        position: 'current',
        index: currentIndex.value,
        data: achievements[currentIndex.value]!,
      },
      {
        position: 'next',
        index: nextIndex,
        data: achievements[nextIndex]!,
      },
    ];
  });

  const autoAdvanceInterval = ref<number | null>(null);

  const startAutoAdvance = () => {
    if (autoAdvanceInterval.value !== null) {
      return;
    }

    autoAdvanceInterval.value = window.setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % achievements.length;
    }, 5000);
  };

  const stopAutoAdvance = () => {
    if (autoAdvanceInterval.value === null) {
      return;
    }

    clearInterval(autoAdvanceInterval.value);
    autoAdvanceInterval.value = null;
  };

  const goToAchievement = (index: number) => {
    stopAutoAdvance();
    currentIndex.value = (index + achievements.length) % achievements.length;
  };

  onMounted(() => {
    startAutoAdvance();
  });

  onBeforeUnmount(() => {
    stopAutoAdvance();
  });
</script>

<template>
  <div class="achievements-view">
    <SectionHeader
      title="Achievements"
      subtitle="What I'm most proud of to date"
    />
    <div class="slideshow-container">
      <div class="slides-placeholder">
        <div class="slides">
          <BasicCard
            v-for="slide in slides"
            :key="`${slide.position}-${slide.index}`"
            :class="['achievement-card', slide.position]"
            interactive
            @click="goToAchievement(slide.index)"
          >
            <div class="achievement-content">
              <div class="achievement-date">{{ slide.data.date }}</div>
              <h3 class="achievement-summary">{{ slide.data.summary }}</h3>
              <p class="achievement-description">{{ slide.data.description }}</p>
            </div>
          </BasicCard>
        </div>
      </div>
      <PageControls
        v-model="currentIndex"
        :page-count="achievements.length"
      />
    </div>
  </div>
</template>

<style scoped>
  .achievements-view {
    --slide-height: 250px;

    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1100px;
  }

  .slideshow-container {
    display: flex;
    flex-direction: column;
    gap: var(--ja-spacing-x-large);
    width: 100%;
  }

  .slides-placeholder {
    position: relative;
    width: 100%;
    height: var(--slide-height);
  }

  .slides {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    flex-wrap: nowrap;
    align-items: stretch;
  }

  .achievement-card {
    padding: var(--ja-spacing-2x-large);
    height: var(--slide-height);
    width: 600px;

    &:not(.current) {
      opacity: 0.6;
      transform: scale(0.9);
      user-select: none;
      cursor: pointer;
    }

    &.prev {
      mask-image: linear-gradient(to right, transparent 25%, rgba(0, 0, 0, 1) 75%);
      -webkit-mask-image: linear-gradient(to right, transparent 25%, rgba(0, 0, 0, 1) 75%);
    }

    &.next {
      mask-image: linear-gradient(to left, transparent 25%, rgba(0, 0, 0, 1) 75%);
      -webkit-mask-image: linear-gradient(to left, transparent 25%, rgba(0, 0, 0, 1) 75%);
    }
  }

  .achievement-content {
    display: flex;
    flex-direction: column;
    gap: var(--ja-spacing-small);
  }

  .achievement-date {
    font-family: var(--ja-font-mono);
    font-size: var(--ja-font-size-small);
    font-weight: var(--ja-font-weight-medium);
    color: var(--ja-color-teal-400);
  }

  .achievement-summary {
    font-size: var(--ja-font-size-large);
    font-weight: var(--ja-font-weight-normal);
    line-height: var(--ja-line-height-normal);
    color: var(--ja-color-neutral-200);
  }

  .achievement-description {
    font-size: var(--ja-font-size-medium);
    color: var(--ja-color-neutral-200);
    line-height: var(--ja-line-height-relaxed);
    margin: 0;
  }
</style>
