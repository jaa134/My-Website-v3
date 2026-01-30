<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

  import BasicCard from '@/components/common/BasicCard.vue';
  import PageControls from '@/components/common/PageControls.vue';
  import SectionHeader from '@/components/common/SectionHeader.vue';

  /* Hobbies //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Hobby {
    name: string;
    description: string;
  }

  const hobbies: Hobby[] = [
    {
      name: 'Climbing',
      description: "I've summitted peaks like the Grand Teton and have done multiple climbs over 1500 feet in height.",
    },
    {
      name: 'Running',
      description: 'My best 5k time is 17:50 and I once ran a marathon by myself in 3:10:00. It helps calm my mind.',
    },
    {
      name: 'Swimming',
      description:
        'I swam competitively for 15 years and in college. For many years I was training in a pool for 22 hours a week.',
    },
    {
      name: 'Hiking',
      description: 'My longest day-hike is 35 miles along the ridgeline of 3 peaks in South Africa.',
    },
    {
      name: 'Traveling',
      description: "My goal is the visit a new place every year. In my adult life, I've travelled to 15+ countries.",
    },
    {
      name: 'Skiing',
      description:
        'I tore my ACL skiing in 2023. Two seasons later, I was fully recovered and skied 35 days with 600k+ feet of vertical in ~650 miles.',
    },
  ];

  /* Slideshow ////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Slide {
    position: 'prev' | 'current' | 'next';
    index: number;
    data: Hobby;
  }

  const currentIndex = ref(0);

  const slides = computed<Slide[]>(() => {
    const previousIndex = (currentIndex.value + hobbies.length - 1) % hobbies.length;
    const nextIndex = (currentIndex.value + hobbies.length + 1) % hobbies.length;

    return [
      {
        position: 'prev',
        index: previousIndex,
        data: hobbies[previousIndex]!,
      },
      {
        position: 'current',
        index: currentIndex.value,
        data: hobbies[currentIndex.value]!,
      },
      {
        position: 'next',
        index: nextIndex,
        data: hobbies[nextIndex]!,
      },
    ];
  });

  const autoAdvanceInterval = ref<number | null>(null);

  const startAutoAdvance = () => {
    if (autoAdvanceInterval.value !== null) {
      return;
    }

    autoAdvanceInterval.value = window.setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % hobbies.length;
    }, 5000);
  };

  const stopAutoAdvance = () => {
    if (autoAdvanceInterval.value === null) {
      return;
    }

    clearInterval(autoAdvanceInterval.value);
    autoAdvanceInterval.value = null;
  };

  const goToHobby = (index: number) => {
    stopAutoAdvance();
    currentIndex.value = (index + hobbies.length) % hobbies.length;
  };

  onMounted(() => {
    startAutoAdvance();
  });

  onBeforeUnmount(() => {
    stopAutoAdvance();
  });
</script>

<template>
  <div class="hobbies-view">
    <SectionHeader
      title="Hobbies"
      subtitle="Pushing it to the extreme"
      alignment="center"
    />
    <div class="slideshow-container">
      <div class="slides-placeholder">
        <div class="slides">
          <BasicCard
            v-for="slide in slides"
            :key="`${slide.position}-${slide.index}`"
            :class="['hobby-card', slide.position]"
            interactive
            @click="goToHobby(slide.index)"
          >
            <div class="hobby-content">
              <h3 class="hobby-name">{{ slide.data.name }}</h3>
              <p class="hobby-description">{{ slide.data.description }}</p>
            </div>
          </BasicCard>
        </div>
      </div>
      <PageControls
        v-model="currentIndex"
        :page-count="hobbies.length"
      />
    </div>
  </div>
</template>

<style scoped>
  .hobbies-view {
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

  .hobby-card {
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

  .hobby-content {
    display: flex;
    flex-direction: column;
    gap: var(--ja-spacing-small);
  }

  .hobby-name {
    font-size: var(--ja-font-size-large);
    font-weight: var(--ja-font-weight-normal);
    line-height: var(--ja-line-height-normal);
    color: var(--ja-color-neutral-200);
  }

  .hobby-description {
    font-size: var(--ja-font-size-medium);
    color: var(--ja-color-neutral-200);
    line-height: var(--ja-line-height-relaxed);
    margin: 0;
  }
</style>
