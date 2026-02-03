<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

  import ConstructionAlert from '@/components/common/ConstructionAlert.vue';

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
    <ConstructionAlert />
    <div class="content">
      <div class="text-section">
        <h1 class="title">Jacob Alspaw</h1>
        <h2 class="subtitle">My name is Jacob. Click around to learn more!</h2>
        <div class="divider"></div>
        <p class="description">
          I build digital experiences on Earth that monitor systems in orbit. Here's what you should know about me.
        </p>
        <div class="tags">
          <div
            v-for="tag in tags"
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </div>
        </div>
      </div>
      <div class="photo-section">
        <Transition name="slide">
          <img
            :key="currentPhoto"
            :src="currentPhoto"
            alt="Jacob Alspaw"
          />
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .hero-view {
    --hero-image-width: 500px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 1100px;
  }

  .construction-alert {
    width: 600px;
    margin-bottom: var(--ja-spacing-4x-large);
  }

  .content {
    display: grid;
    grid-template-columns: repeat(2, var(--hero-image-width));
    align-items: flex-end;
    gap: var(--ja-spacing-4x-large);
  }

  .text-section {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-family: var(--ja-font-mono);
    font-size: var(--ja-font-size-3x-large);
    font-weight: var(--ja-font-weight-light);
    line-height: var(--ja-line-height-denser);
    text-shadow: 0 0 18px color-mix(in srgb, var(--ja-color-violet-300) 25%, transparent);
    color: transparent;
    background: linear-gradient(120deg, var(--ja-color-neutral-0), var(--ja-color-violet-200));
    background-clip: text;
    margin-bottom: var(--ja-spacing-large);
  }

  .subtitle {
    font-family: var(--ja-font-mono);
    font-size: var(--ja-font-size-medium);
    font-weight: var(--ja-font-weight-light);
    line-height: var(--ja-line-height-denser);
    color: var(--ja-color-neutral-200);
  }

  .divider {
    width: 200px;
    height: 1px;
    background: linear-gradient(to right, var(--ja-color-violet-700), transparent);
    margin: var(--ja-spacing-2x-large) 0 var(--ja-spacing-x-large) 0;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -30%;
      width: 30%;
      height: 100%;
      background: linear-gradient(to right, transparent, var(--ja-color-violet-300), transparent);
      animation: divider-sheen 3.6s ease-in-out infinite;
    }
  }

  .description {
    font-size: var(--ja-font-size-large);
    line-height: var(--ja-line-height-relaxed);
    color: var(--ja-color-neutral-200);
    margin-bottom: var(--ja-spacing-medium);
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ja-spacing-small);
    margin-top: var(--ja-spacing-large);
  }

  .tag {
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

  .photo-section {
    position: relative;
    width: 100%;
    height: 320px;
    border-radius: var(--ja-border-radius-2x-large);
    overflow: hidden;
    background: color-mix(in srgb, var(--ja-color-purple-900) 65%, var(--ja-color-violet-950));
    box-shadow: 0 0 120px 20px color-mix(in srgb, var(--ja-color-purple-400) 30%, transparent);
    animation: photo-glow-shadow 6s ease-in-out infinite;

    &::before {
      content: '';
      position: absolute;
      inset: -30%;
      background: radial-gradient(
        circle at 50% 40%,
        color-mix(in srgb, var(--ja-color-purple-300) 70%, transparent),
        transparent 65%
      );
      opacity: 0.75;
      filter: blur(30px);
      animation: photo-glow 6s ease-in-out infinite;
      pointer-events: none;
      z-index: 0;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
      filter: brightness(0.9);
      pointer-events: none;
      user-select: none;
    }

    .slide-enter-active,
    .slide-leave-active {
      transition: left var(--ja-transition-x-slow) ease;
    }

    .slide-enter-from {
      left: calc(var(--hero-image-width) * -1);
    }

    .slide-enter-to,
    .slide-leave-from {
      left: 0;
    }

    .slide-leave-to {
      left: calc(var(--hero-image-width) + 1px);
    }
  }

  @keyframes divider-sheen {
    0% {
      transform: translateX(0);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    50%,
    100% {
      transform: translateX(360%);
      opacity: 0;
    }
  }

  @keyframes photo-glow {
    0%,
    100% {
      opacity: 0.45;
      transform: scale(0.96);
    }
    50% {
      opacity: 1;
      transform: scale(1.08);
    }
  }

  @keyframes photo-glow-shadow {
    0%,
    100% {
      box-shadow: 0 0 120px 20px color-mix(in srgb, var(--ja-color-purple-400) 25%, transparent);
    }
    50% {
      box-shadow: 0 0 200px 40px color-mix(in srgb, var(--ja-color-purple-300) 45%, transparent);
    }
  }
</style>
