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
    generateStars();
    window.addEventListener('resize', handleResize);
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
    background-color: white;
    border-radius: 50%;
    box-shadow:
      0 0 2px rgba(255, 255, 255, 0.8),
      0 0 4px rgba(255, 255, 255, 0.6),
      0 0 6px rgba(255, 255, 255, 0.4);
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
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow:
      0 0 3px rgba(255, 255, 255, 0.9),
      0 0 6px rgba(255, 255, 255, 0.7),
      0 0 9px rgba(255, 255, 255, 0.5);
  }

  .star:nth-child(3n + 1) {
    background-color: rgba(200, 220, 255, 0.8);
    box-shadow:
      0 0 2px rgba(200, 220, 255, 0.8),
      0 0 4px rgba(200, 220, 255, 0.6),
      0 0 6px rgba(200, 220, 255, 0.4);
  }

  .star:nth-child(3n + 2) {
    background-color: rgba(255, 255, 240, 0.7);
    box-shadow:
      0 0 2px rgba(255, 255, 240, 0.7),
      0 0 4px rgba(255, 255, 240, 0.5),
      0 0 6px rgba(255, 255, 240, 0.3);
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
