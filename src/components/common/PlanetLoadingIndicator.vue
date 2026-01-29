<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import {
    Clock,
    Group,
    MathUtils,
    Mesh,
    MeshPhysicalMaterial,
    MeshStandardMaterial,
    PerspectiveCamera,
    Scene,
    SphereGeometry,
    TorusGeometry,
    WebGLRenderer,
  } from 'three';
  import { onBeforeUnmount, onMounted, ref } from 'vue';

  /* 3d rendering /////////////////////////////////////////////////////////////////////////////////////////////////// */

  const container = ref<HTMLDivElement | null>(null);

  let renderer: WebGLRenderer | null = null;
  let scene: Scene | null = null;
  let camera: PerspectiveCamera | null = null;
  let frameId: number | null = null;

  let planetGeometry: SphereGeometry | null = null;
  let planetMaterial: MeshPhysicalMaterial | null = null;

  let moonGeometry: SphereGeometry | null = null;
  let moonMaterial: MeshStandardMaterial | null = null;

  let ringGeometry: TorusGeometry | null = null;
  let ringMaterial: MeshStandardMaterial | null = null;

  const clock = new Clock();

  onMounted(() => {
    if (!container.value) {
      return;
    }

    scene = new Scene();

    camera = new PerspectiveCamera();
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.value.clientWidth, container.value.clientHeight, false);
    container.value.appendChild(renderer.domElement);

    planetGeometry = new SphereGeometry(2, 64, 64);
    planetMaterial = new MeshPhysicalMaterial({
      color: 0x2a0f5f,
      emissive: 0x2a0f5f,
      emissiveIntensity: 0.7,
    });
    const planet = new Mesh(planetGeometry, planetMaterial);

    moonGeometry = new SphereGeometry(0.15, 32, 32);
    moonMaterial = new MeshStandardMaterial({
      color: 0x99ff99,
      emissive: 0x99ff99,
      emissiveIntensity: 0.4,
    });
    const moon = new Mesh(moonGeometry, moonMaterial);

    ringGeometry = new TorusGeometry(3.5, 0.02, 12, 100);
    ringMaterial = new MeshStandardMaterial({
      color: 0x6b2dff,
      emissive: 0x6b2dff,
      emissiveIntensity: 0.8,
    });
    const ring = new Mesh(ringGeometry, ringMaterial);

    const orbitGroup = new Group();
    orbitGroup.add(moon);
    orbitGroup.add(ring);
    moon.position.set(3.5, 0, 0);
    orbitGroup.rotation.x = MathUtils.degToRad(60);

    scene.add(planet, orbitGroup);

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (!renderer || !scene || !camera) {
        return;
      }

      const phase = clock.getElapsedTime() * 0.9;
      orbitGroup.rotation.z = phase;

      renderer.render(scene, camera);
    };

    animate();
  });

  onBeforeUnmount(() => {
    if (typeof frameId === 'number') {
      cancelAnimationFrame(frameId);
    }

    renderer?.dispose();

    planetMaterial?.dispose();
    planetGeometry?.dispose();

    moonMaterial?.dispose();
    moonGeometry?.dispose();

    ringMaterial?.dispose();
    ringGeometry?.dispose();
  });
</script>

<template>
  <div class="loading-planet">
    <div
      ref="container"
      class="canvas"
    ></div>
    <div class="label">Loading</div>
  </div>
</template>

<style scoped>
  .loading-planet {
    position: relative;
    width: 500px;
    height: 500px;
  }

  .canvas {
    width: 100%;
    height: 100%;
  }

  .label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: var(--ja-font-size-large);
    letter-spacing: var(--ja-letter-spacing-loose);
    background: linear-gradient(90deg, var(--ja-color-violet-400), var(--ja-color-neutral-400));
    background-size: 200% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 6px color-mix(in srgb, var(--ja-color-violet-500) 30%, transparent));
    animation: gradient-shift 4s ease-in-out infinite;
  }

  @keyframes gradient-shift {
    0% {
      background-position: 0% 50%;
      filter: drop-shadow(0 0 6px color-mix(in srgb, var(--ja-color-violet-500) 30%, transparent));
    }
    50% {
      background-position: 100% 50%;
      filter: drop-shadow(0 0 8px color-mix(in srgb, var(--ja-color-violet-500) 40%, transparent));
    }
    100% {
      background-position: 0% 50%;
      filter: drop-shadow(0 0 6px color-mix(in srgb, var(--ja-color-violet-500) 30%, transparent));
    }
  }
</style>
