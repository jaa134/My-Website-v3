<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { onBeforeUnmount, onMounted, ref } from 'vue';

  import BasicCard from '@/components/common/BasicCard.vue';

  /* Roles ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const tags = ['Frontend', 'Team Lead', 'Satellite Operator'];

  /* Slideshow ////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const photos = [
    '/assets/images/profiles/1.webp',
    '/assets/images/profiles/2.webp',
    '/assets/images/profiles/3.webp',
    '/assets/images/profiles/4.webp',
    '/assets/images/profiles/5.webp',
  ];

  const currentIndex = ref(0);

  let slideshowInterval: ReturnType<typeof setInterval> | null = null;

  onMounted(() => {
    slideshowInterval = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % photos.length;
    }, 10000);
  });

  onBeforeUnmount(() => {
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
    }
  });
</script>

<template>
  <div class="hero-view">
    <div class="hero-text">
      <div class="status-indicator">
        <span class="status-dot"></span>
        <span class="status-text">ONLINE</span>
      </div>
      <h1 class="title-name">Jacob Alspaw</h1>
      <h2 class="title-description">My name is Jacob. Get to know me!</h2>
      <div class="title-divider"></div>
      <p class="hero-subtitle">
        I build digital experiences on Earth that monitor systems in orbit. Here's what you should know about me.
      </p>
      <div class="hero-tags">
        <div
          v-for="tag in tags"
          :key="tag"
          class="hero-tag"
        >
          {{ tag }}
        </div>
      </div>
    </div>
    <BasicCard class="hero-photo">
      <div class="hero-photo-slideshow">
        <img
          v-for="(photo, index) in photos"
          :key="index"
          :class="[{ active: index === currentIndex }]"
          :src="photo"
          alt="Jacob Alspaw"
        />
      </div>
    </BasicCard>
  </div>
</template>

<style scoped>
  .hero-view {
    display: grid;
    grid-template-columns: repeat(2, 500px);
    align-items: flex-end;
    gap: var(--ja-spacing-4x-large);
    max-width: 1100px;
  }

  .hero-text {
    display: flex;
    flex-direction: column;
  }

  .status-indicator {
    display: flex;
    align-items: center;
    gap: var(--ja-spacing-small);
    margin-bottom: var(--ja-spacing-medium);
    font-family: var(--ja-font-mono);
    font-size: var(--ja-font-size-small);
    letter-spacing: var(--ja-letter-spacing-loose);
  }

  .status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--ja-color-emerald-400);
    animation: pulse 2s ease-in-out infinite;
  }

  .status-text {
    color: var(--ja-color-emerald-300);
  }

  .title-name {
    font-family: var(--ja-font-mono);
    font-size: var(--ja-font-size-3x-large);
    font-weight: var(--ja-font-weight-light);
    line-height: var(--ja-line-height-dense);
    color: var(--ja-color-neutral-100);
  }

  .title-description {
    font-family: var(--ja-font-mono);
    font-size: var(--ja-font-size-medium);
    font-weight: var(--ja-font-weight-light);
    color: var(--ja-color-neutral-200);
  }

  .title-divider {
    width: 200px;
    height: 1px;
    background: linear-gradient(to right, var(--ja-color-violet-700), transparent);
    margin: var(--ja-spacing-x-large) 0;
  }

  .hero-subtitle {
    width: 500px;
    font-size: var(--ja-font-size-large);
    line-height: var(--ja-line-height-relaxed);
    color: var(--ja-color-neutral-200);
  }

  .hero-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ja-spacing-small);
    margin-top: var(--ja-spacing-large);
  }

  .hero-tag {
    display: inline-flex;
    align-items: center;
    gap: var(--ja-spacing-small);
    padding: var(--ja-spacing-x-small) var(--ja-spacing-large);
    border: 1px solid color-mix(in srgb, var(--ja-color-purple-400) 35%, transparent);
    border-radius: var(--ja-border-radius-pill);
    background: linear-gradient(135deg, var(--ja-color-violet-950), var(--ja-color-purple-900));
    box-shadow: 0 0 10px color-mix(in srgb, var(--ja-color-purple-400) 15%, transparent);
    font-family: var(--ja-font-mono);
    font-size: var(--ja-font-size-small);
  }

  .hero-photo {
    * {
      pointer-events: none;
      user-select: none;
    }
  }

  .hero-photo-slideshow {
    position: relative;
    width: 100%;
    height: 350px;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity var(--ja-transition-slow) ease-in-out;

    &.active {
      opacity: 1;
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
      box-shadow: 0 0 8px color-mix(in srgb, var(--ja-color-emerald-400) 60%, transparent);
    }
    50% {
      opacity: 0.75;
      box-shadow: 0 0 12px color-mix(in srgb, var(--ja-color-emerald-400) 80%, transparent);
    }
  }
</style>
