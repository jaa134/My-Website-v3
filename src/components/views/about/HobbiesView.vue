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
    link: string;
  }

  const hobbies: Hobby[] = [
    {
      name: 'Climbing',
      description: "I've summitted peaks like the Grand Teton and have done multiple climbs over 1500 feet in height.",
      link: '/assets/images/hobbies/climbing.webp',
    },
    {
      name: 'Running',
      description: 'My best 5k time is 17:50 and I once ran a marathon by myself in 3:10:00. It helps calm my mind.',
      link: '/assets/images/hobbies/running.webp',
    },
    {
      name: 'Swimming',
      description:
        'I swam competitively for 15 years and in college. For many years I was training in a pool for 22 hours a week.',
      link: '/assets/images/hobbies/swimming.webp',
    },
    {
      name: 'Hiking',
      description: 'My longest day-hike is 35 miles along the ridgeline of 3 peaks in South Africa.',
      link: '/assets/images/hobbies/hiking.webp',
    },
    {
      name: 'Traveling',
      description: "My goal is the visit a new place every year. In my adult life, I've travelled to 15+ countries.",
      link: '/assets/images/hobbies/traveling.webp',
    },
    {
      name: 'Skiing',
      description:
        'I tore my ACL skiing in 2023. Two seasons later, I was fully recovered and skied 35 days with 600k+ feet of vertical in ~650 miles.',
      link: '/assets/images/hobbies/skiing.webp',
    },
  ];

  /* Slideshow ////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Slide {
    position: 'prev' | 'current' | 'next';
    index: number;
    data: Hobby;
  }

  const currentIndex = ref(0);

  const normalizeIndex = (index: number) => {
    return (index + hobbies.length) % hobbies.length;
  };

  const slides = computed<Slide[]>(() => {
    const previousIndex = normalizeIndex(currentIndex.value - 1);
    const nextIndex = normalizeIndex(currentIndex.value + 1);

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
    if (typeof autoAdvanceInterval.value === 'number') {
      return;
    }

    autoAdvanceInterval.value = setInterval(() => {
      currentIndex.value = normalizeIndex(currentIndex.value + 1);
    }, 5000);
  };

  const stopAutoAdvance = () => {
    if (!(typeof autoAdvanceInterval.value === 'number')) {
      return;
    }

    clearInterval(autoAdvanceInterval.value);
    autoAdvanceInterval.value = null;
  };

  const goToHobby = (index: number) => {
    stopAutoAdvance();
    currentIndex.value = normalizeIndex(index);
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
              <div class="hobby-text">
                <h3 class="hobby-name">{{ slide.data.name }}</h3>
                <p class="hobby-description">{{ slide.data.description }}</p>
              </div>
              <img
                class="hobby-image"
                :src="slide.data.link"
                :alt="slide.data.name"
              />
            </div>
          </BasicCard>
        </div>
      </div>
      <PageControls
        :model-value="currentIndex"
        :page-count="hobbies.length"
        @update:model-value="goToHobby"
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
    align-items: flex-start;
    height: var(--slide-height);
  }

  .hobby-text {
    display: flex;
    flex-direction: column;
    gap: var(--ja-spacing-small);
    padding: var(--ja-spacing-2x-large);
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

  .hobby-image {
    flex: 0 0 auto;
    width: calc(var(--slide-height) * 0.75);
    height: var(--slide-height);
    background: color-mix(in srgb, var(--ja-color-neutral-900) 75%, transparent);
    object-fit: cover;
  }
</style>
