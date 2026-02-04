<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { onBeforeUnmount, onMounted, ref } from 'vue';

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

  /* Cloud generation ////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Cloud {
    id: number;
    image: string;
    width: number;
    height: number;
    scale: number;
    rotate: number;
    stretch: number;
    squish: number;
    opacity: number;
    blur: number;
    brightness: number;
    duration: number;
    delay: number;
    drift: number;
    top: number;
    startX: number;
    endX: number;
  }

  const cloudImageCount = 9;

  const clouds = ref<Array<Cloud>>([]);

  const resetClouds = () => {
    clouds.value = [];
  };

  const calculateCloudCount = (): number => {
    const area = window.innerWidth * window.innerHeight;
    const density = 0.0000022;
    return Math.min(14, Math.max(6, Math.round(area * density)));
  };

  const generateClouds = () => {
    const cloudCount = calculateCloudCount();
    const newClouds: Cloud[] = [];

    for (let id = 0; id < cloudCount; id++) {
      const image = `/images/clouds/${Math.floor(Math.random() * cloudImageCount) + 1}.webp`;

      const width = 18 + Math.random() * 20;
      const height = width * (0.25 + Math.random() * 0.28);

      const scale = 1 + Math.random() * 0.75;
      const rotate = (Math.random() * 2 - 1) * 2;
      const stretch = 0.95 + Math.random() * 0.15;
      const squish = 0.95 + Math.random() * 0.1;
      const opacity = 0.2 + Math.random() * 0.6;
      const blur = 3 + Math.random() * 2;
      const brightness = 0.5 + Math.random() * 0.1;

      const duration = 160 + Math.random() * 220;
      const delay = -Math.random() * duration;

      const drift = (Math.random() * 2 - 1) * 10;
      const top = 6 + Math.random() * 75;
      let startX, endX;
      if (Math.random() > 0.5) {
        startX = -30 - Math.random() * 25;
        endX = 110 + Math.random() * 25;
      } else {
        startX = 110 + Math.random() * 25;
        endX = -30 - Math.random() * 25;
      }

      newClouds.push({
        id,
        image,
        width,
        height,
        scale,
        rotate,
        stretch,
        squish,
        opacity,
        blur,
        brightness,
        duration,
        delay,
        drift,
        top,
        startX,
        endX,
      });
    }

    clouds.value = newClouds;
  };

  /* Resize ///////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const isResizing = ref(false);

  let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

  const handleResize = () => {
    isResizing.value = true;

    resetStaticStars();
    resetShootingStar();
    resetClouds();

    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }

    resizeTimeout = setTimeout(() => {
      generateStaticStars();
      scheduleShootingStar();
      generateClouds();
      isResizing.value = false;
    }, 250);
  };

  /* Lifecycle ////////////////////////////////////////////////////////////////////////////////////////////////////// */

  onMounted(() => {
    window.addEventListener('resize', handleResize);
    generateStaticStars();
    scheduleShootingStar();
    generateClouds();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }
    resetStaticStars();
    resetShootingStar();
    resetClouds();
  });
</script>

<template>
  <Transition
    name="fade-in-slow"
    mode="out-in"
  >
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

      <div
        v-for="cloud in clouds"
        :key="cloud.id"
        class="cloud"
        :style="{
          '--cloud-scale': cloud.scale.toString(),
          '--cloud-rotate': `${cloud.rotate}deg`,
          '--cloud-stretch': cloud.stretch.toString(),
          '--cloud-squish': cloud.squish.toString(),
          '--cloud-opacity': cloud.opacity.toString(),
          '--cloud-blur': `${cloud.blur}px`,
          '--cloud-brightness': cloud.brightness.toString(),
          '--cloud-duration': `${cloud.duration}s`,
          '--cloud-delay': `${cloud.delay}s`,
          '--cloud-drift': `${cloud.drift}px`,
          '--cloud-start-x': `${cloud.startX}vw`,
          '--cloud-end-x': `${cloud.endX}vw`,
          top: `${cloud.top}%`,
          width: `${cloud.width}vw`,
          height: `${cloud.height}vw`,
          backgroundImage: `url(${cloud.image})`,
        }"
      ></div>
    </div>
  </Transition>
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

  .cloud {
    position: absolute;
    left: 0;
    opacity: var(--cloud-opacity);
    filter: blur(var(--cloud-blur)) brightness(var(--cloud-brightness)) saturate(0.85);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    transform: translate3d(var(--cloud-start-x), 0, 0) scale(var(--cloud-scale)) scaleX(var(--cloud-stretch))
      scaleY(var(--cloud-squish)) rotate(var(--cloud-rotate));
    animation: cloud-drift var(--cloud-duration) linear infinite;
    animation-delay: var(--cloud-delay);
    will-change: transform, opacity;
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

  @keyframes cloud-drift {
    0% {
      transform: translate3d(var(--cloud-start-x), 0, 0) scale(var(--cloud-scale)) scaleX(var(--cloud-stretch))
        scaleY(var(--cloud-squish)) rotate(var(--cloud-rotate));
    }
    50% {
      transform: translate3d(calc((var(--cloud-start-x) + var(--cloud-end-x)) / 2), var(--cloud-drift), 0)
        scale(var(--cloud-scale)) scaleX(var(--cloud-stretch)) scaleY(var(--cloud-squish)) rotate(var(--cloud-rotate));
    }
    100% {
      transform: translate3d(var(--cloud-end-x), 0, 0) scale(var(--cloud-scale)) scaleX(var(--cloud-stretch))
        scaleY(var(--cloud-squish)) rotate(var(--cloud-rotate));
    }
  }
</style>
