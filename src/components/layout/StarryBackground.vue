<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { onMounted, onUnmounted, ref } from 'vue';

  /* Types ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Star {
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
  }

  /* Star generation //////////////////////////////////////////////////////////////////////////////////////////////// */

  const stars = ref<Array<Star>>([]);

  let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

  // Calculate star count from a desired density. Average 1 star per 10,000 square pixels
  // to maintain a consistent density across different screen sizes.
  const calculateStarCount = (): number => {
    const area = window.innerWidth * window.innerHeight;
    const density = 0.0001;
    return Math.floor(area * density);
  };

  const generateStars = () => {
    const starCount = calculateStarCount();

    const newStars = [];
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5, // 0.5px to 2.5px
        delay: Math.random() * 3, // 0 to 3 seconds
        duration: Math.random() * 2 + 1.5, // 1.5 to 3.5 seconds
      });
    }

    stars.value = newStars;
  };

  const handleResize = () => {
    stars.value = [];

    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }

    resizeTimeout = setTimeout(() => {
      generateStars();
    }, 250);
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);
    generateStars();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }
  });
</script>

<template>
  <transition name="fade-in-out">
    <div
      v-if="stars.length"
      class="starry-background"
    >
      <div
        v-for="(star, index) in stars"
        :key="index"
        class="star"
        :style="{
          left: `${star.x}%`,
          top: `${star.y}%`,
          width: `${star.size}px`,
          height: `${star.size}px`,
          animationDelay: `${star.delay}s`,
          animationDuration: `${star.duration}s`,
        }"
      ></div>
    </div>
  </transition>
</template>

<style scoped>
  .starry-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
    pointer-events: none;
  }

  .star {
    position: absolute;
    background-color: var(--ja-color-neutral-0);
    border-radius: 50%;
    box-shadow:
      0 0 2px color-mix(in srgb, var(--ja-color-neutral-0) 80%, transparent),
      0 0 4px color-mix(in srgb, var(--ja-color-neutral-0) 60%, transparent),
      0 0 6px color-mix(in srgb, var(--ja-color-neutral-0) 40%, transparent);
    animation: twinkle infinite ease-in-out;
    transform: translate(-50%, -50%);
  }

  @keyframes twinkle {
    0%,
    100% {
      opacity: 0.3;
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.2);
    }
  }

  /* Add some variety with different star intensities */
  .star:nth-child(3n) {
    background-color: color-mix(in srgb, var(--ja-color-neutral-0) 90%, transparent);
    box-shadow:
      0 0 3px color-mix(in srgb, var(--ja-color-neutral-0) 90%, transparent),
      0 0 6px color-mix(in srgb, var(--ja-color-neutral-0) 70%, transparent),
      0 0 9px color-mix(in srgb, var(--ja-color-neutral-0) 50%, transparent);
  }

  .star:nth-child(3n + 1) {
    background-color: color-mix(in srgb, var(--ja-color-sky-100) 80%, transparent);
    box-shadow:
      0 0 2px color-mix(in srgb, var(--ja-color-sky-100) 80%, transparent),
      0 0 4px color-mix(in srgb, var(--ja-color-sky-100) 60%, transparent),
      0 0 6px color-mix(in srgb, var(--ja-color-sky-100) 40%, transparent);
  }

  .star:nth-child(3n + 2) {
    background-color: color-mix(in srgb, var(--ja-color-yellow-50) 70%, transparent);
    box-shadow:
      0 0 2px color-mix(in srgb, var(--ja-color-yellow-50) 70%, transparent),
      0 0 4px color-mix(in srgb, var(--ja-color-yellow-50) 50%, transparent),
      0 0 6px color-mix(in srgb, var(--ja-color-yellow-50) 30%, transparent);
  }

  /* Fade-in-out transition */
  .fade-in-out-enter-active {
    transition: opacity 1s ease-in;
  }

  .fade-in-out-leave-active {
    transition: opacity 0.3s ease-out;
  }

  .fade-in-out-enter-from {
    opacity: 0;
  }

  .fade-in-out-leave-to {
    opacity: 0;
  }
</style>
