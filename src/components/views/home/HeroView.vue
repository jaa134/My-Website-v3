<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

  /* Roles ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const tags = ['Frontend', 'Team Lead', 'Satellite Operator'];

  /* Slideshow ////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const photos = ['/images/hero/1.webp', '/images/hero/2.webp', '/images/hero/3.webp'];

  const currentIndex = ref(0);

  const currentPhoto = computed(() => photos[currentIndex.value]!);

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
    <div class="hero-photo">
      <Transition name="hero-slide">
        <img
          :key="currentPhoto"
          class="hero-image"
          :src="currentPhoto"
          alt="Jacob Alspaw"
        />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
  .hero-view {
    --hero-image-width: 500px;

    display: grid;
    grid-template-columns: repeat(2, var(--hero-image-width));
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
    border-radius: var(--ja-border-radius-circle);
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
    position: relative;
    width: 100%;
    height: 320px;
    border-radius: var(--ja-border-radius-2x-large);
    overflow: hidden;
  }

  .hero-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    user-select: none;
  }

  .hero-slide-enter-active,
  .hero-slide-leave-active {
    transition: left var(--ja-transition-x-slow) ease-in-out;
  }

  .hero-slide-enter-from {
    left: calc(var(--hero-image-width) * -1);
  }

  .hero-slide-enter-to,
  .hero-slide-leave-from {
    left: 0;
  }

  .hero-slide-leave-to {
    left: var(--hero-image-width);
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
