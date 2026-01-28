<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { onMounted, onUnmounted, ref } from 'vue';

  /* Static star generation ///////////////////////////////////////////////////////////////////////////////////////// */

  interface StaticStar {
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
  }

  const staticStars = ref<Array<StaticStar>>([]);

  const resetStaticStars = () => {
    staticStars.value = [];
  };

  const calculateStaticStarCount = (): number => {
    const area = window.innerWidth * window.innerHeight;
    const density = 0.00015;
    return Math.floor(area * density);
  };

  const generateStaticStars = () => {
    const starCount = calculateStaticStarCount();

    const newStars = [];
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 1.5,
      });
    }

    staticStars.value = newStars;
  };

  /* Shooting star generation /////////////////////////////////////////////////////////////////////////////////////// */

  interface ShootingStar {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    angle: number;
    duration: number;
    tailLength: number;
    size: number;
    opacity: number;
  }

  const shootingStar = ref<ShootingStar | null>(null);

  let shootingStarSschedulingTimeout: ReturnType<typeof setTimeout> | null = null;
  let shootingStarResetTimeout: ReturnType<typeof setTimeout> | null = null;

  const resetShootingStar = () => {
    shootingStar.value = null;
    if (shootingStarSschedulingTimeout) {
      clearTimeout(shootingStarSschedulingTimeout);
    }
    if (shootingStarResetTimeout) {
      clearTimeout(shootingStarResetTimeout);
    }
  };

  const scheduleShootingStar = () => {
    const minDelay = 15000;
    const maxDelay = 30000;
    const delay = minDelay + Math.random() * (maxDelay - minDelay);

    shootingStarSschedulingTimeout = setTimeout(() => {
      animateShootingStar();
    }, delay);
  };

  const animateShootingStar = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const startX = 0 - Math.random() * width;
    const startY = 0 - Math.random() * height;
    const endX = width + Math.random() * width;
    const endY = height + Math.random() * height;

    const dx = endX - startX;
    const dy = endY - startY;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const distance = Math.hypot(dx, dy);
    const speed = 2200 + Math.random() * 1000;
    const duration = Math.max(0.8, distance / speed);

    const tailLength = 250 + Math.random() * 180;
    const size = 1 + Math.random() * 1.2;
    const opacity = 0.6 + Math.random() * 0.4;

    const star: ShootingStar = {
      startX,
      startY,
      endX,
      endY,
      angle,
      duration,
      tailLength,
      size,
      opacity,
    };

    shootingStar.value = star;

    shootingStarResetTimeout = setTimeout(() => {
      shootingStar.value = null;
      scheduleShootingStar();
    }, duration + 1000);
  };

  /* Resize ///////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const isResizing = ref(false);

  let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

  const handleResize = () => {
    isResizing.value = true;

    resetStaticStars();
    resetShootingStar();

    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }

    resizeTimeout = setTimeout(() => {
      generateStaticStars();
      scheduleShootingStar();
      isResizing.value = false;
    }, 250);
  };

  /* Lifecycle ////////////////////////////////////////////////////////////////////////////////////////////////////// */

  onMounted(() => {
    window.addEventListener('resize', handleResize);
    generateStaticStars();
    scheduleShootingStar();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }
    resetStaticStars();
    resetShootingStar();
  });
</script>

<template>
  <transition name="fade-in-out">
    <div
      v-if="!isResizing"
      class="starry-background"
    >
      <div
        v-for="(staticStar, index) in staticStars"
        :key="index"
        class="static-star"
        :style="{
          left: `${staticStar.x}%`,
          top: `${staticStar.y}%`,
          width: `${staticStar.size}px`,
          height: `${staticStar.size}px`,
          animationDelay: `${staticStar.delay}s`,
          animationDuration: `${staticStar.duration}s`,
        }"
      ></div>
      <svg
        v-if="shootingStar"
        class="shooting-star"
        :width="shootingStar.tailLength + shootingStar.size * 4"
        :height="shootingStar.size * 4"
        :viewBox="`0 0 ${shootingStar.tailLength + shootingStar.size * 4} ${shootingStar.size * 4}`"
        xmlns="http://www.w3.org/2000/svg"
        :style="{
          '--start-x': `${shootingStar.startX}px`,
          '--start-y': `${shootingStar.startY}px`,
          '--end-x': `${shootingStar.endX}px`,
          '--end-y': `${shootingStar.endY}px`,
          '--angle': `${shootingStar.angle}deg`,
          '--duration': `${shootingStar.duration}s`,
          '--opacity': shootingStar.opacity.toString(),
        }"
      >
        <defs>
          <linearGradient
            id="shooting-star-gradient"
            x1="0"
            y1="0"
            :x2="shootingStar.tailLength"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0"
              stop-color="var(--ja-color-neutral-0)"
              stop-opacity="0"
            />
            <stop
              offset="0.6"
              stop-color="var(--ja-color-sky-200)"
              stop-opacity="0.45"
            />
            <stop
              offset="1"
              stop-color="var(--ja-color-neutral-0)"
              stop-opacity="0.9"
            />
          </linearGradient>
        </defs>
        <line
          :x1="0"
          :y1="shootingStar.size * 2"
          :x2="shootingStar.tailLength"
          :y2="shootingStar.size * 2"
          :stroke="`url(#shooting-star-gradient)`"
          :stroke-width="Math.max(0.6, shootingStar.size)"
          stroke-linecap="round"
        />
        <circle
          :cx="shootingStar.tailLength"
          :cy="shootingStar.size * 2"
          :r="shootingStar.size"
          fill="var(--ja-color-neutral-0)"
          fill-opacity="0.9"
        />
      </svg>
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
    z-index: -1;
    pointer-events: none;
  }

  .static-star {
    position: absolute;
    background-color: var(--ja-color-neutral-0);
    border-radius: 50%;
    animation: twinkle infinite ease-in-out;
    transform: translate(-50%, -50%);
    will-change: opacity, transform;

    &:nth-child(3n) {
      background-color: color-mix(in srgb, var(--ja-color-neutral-0) 90%, transparent);
      box-shadow:
        0 0 3px color-mix(in srgb, var(--ja-color-neutral-0) 90%, transparent),
        0 0 6px color-mix(in srgb, var(--ja-color-neutral-0) 70%, transparent),
        0 0 9px color-mix(in srgb, var(--ja-color-neutral-0) 50%, transparent);
    }

    &:nth-child(3n + 1) {
      background-color: color-mix(in srgb, var(--ja-color-sky-100) 80%, transparent);
      box-shadow:
        0 0 2px color-mix(in srgb, var(--ja-color-sky-100) 80%, transparent),
        0 0 4px color-mix(in srgb, var(--ja-color-sky-100) 60%, transparent),
        0 0 6px color-mix(in srgb, var(--ja-color-sky-100) 40%, transparent);
    }

    &:nth-child(3n + 2) {
      background-color: color-mix(in srgb, var(--ja-color-yellow-50) 70%, transparent);
      box-shadow:
        0 0 2px color-mix(in srgb, var(--ja-color-yellow-50) 70%, transparent),
        0 0 4px color-mix(in srgb, var(--ja-color-yellow-50) 50%, transparent),
        0 0 6px color-mix(in srgb, var(--ja-color-yellow-50) 30%, transparent);
    }
  }

  .shooting-star {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    opacity: var(--opacity);
    filter: drop-shadow(0 0 6px color-mix(in srgb, var(--ja-color-sky-200) 60%, transparent));
    transform: translate(var(--start-x), var(--start-y)) rotate(var(--angle));
    animation: shooting-star-move var(--duration) ease-out forwards;
    will-change: opacity, transform;
  }

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

  @keyframes shooting-star-move {
    0% {
      opacity: 0;
      transform: translate(var(--start-x), var(--start-y)) rotate(var(--angle));
    }
    10% {
      opacity: var(--opacity);
    }
    100% {
      opacity: 0;
      transform: translate(var(--end-x), var(--end-y)) rotate(var(--angle));
    }
  }
</style>
