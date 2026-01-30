<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { CylinderGeometry, Group, Mesh, MeshLambertMaterial, SphereGeometry } from 'three';
  import { onBeforeUnmount, onMounted, ref } from 'vue';

  import { useGlobe } from '@/composables/useGlobe.js';

  import SectionHeader from '@/components/common/SectionHeader.vue';

  /* Globe ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const globeSize = 650;
  const homeCoordinates = {
    lat: 41.482,
    lng: -81.7982,
  };

  const { globeInstance, initializeGlobe, destroyGlobe } = useGlobe();

  const globeContainer = ref<HTMLDivElement>();

  onMounted(() => {
    if (!globeContainer.value) {
      return;
    }

    initializeGlobe(globeContainer.value, {
      width: globeSize,
      height: globeSize,
      pov: { lat: 45, lng: -82.5, altitude: 1.8 },
      autoRotate: false,
    });

    if (!globeInstance.value) {
      return;
    }

    // Configure home marker
    globeInstance.value
      .objectsData([homeCoordinates])
      .objectLat((d) => (d as typeof homeCoordinates).lat)
      .objectLng((d) => (d as typeof homeCoordinates).lng)
      .objectAltitude(0)
      .objectRotation(() => ({ x: 90 }))
      .objectThreeObject(() => createPin());

    // Configure home label
    globeInstance.value
      .htmlElementsData([homeCoordinates])
      .htmlLat((d) => (d as typeof homeCoordinates).lat + 5)
      .htmlLng((d) => (d as typeof homeCoordinates).lng)
      .htmlAltitude(() => 0.1)
      .htmlElement(() => createLabel());
  });

  onBeforeUnmount(() => {
    destroyGlobe();
  });

  const createPin = () => {
    const pinMaterial = new MeshLambertMaterial({ color: 0xd38bff });

    const stemHeight = 8;
    const headRadius = 1.25;

    const stem = new Mesh(new CylinderGeometry(0.4, 0.4, stemHeight, 20), pinMaterial);
    const head = new Mesh(new SphereGeometry(headRadius, 24, 24), pinMaterial);

    head.position.y = stemHeight / 2 + headRadius;

    const group = new Group();
    group.add(stem, head);
    return group;
  };

  const createLabel = () => {
    const labelElement = document.createElement('div');
    labelElement.textContent = 'Lakewood, OH';
    labelElement.classList.add('globe-home-label');
    return labelElement;
  };
</script>

<template>
  <div class="places-view">
    <SectionHeader
      title="Trying to find me?"
      subtitle="I'm probably working from home right now."
      alignment="center"
    />
    <div
      ref="globeContainer"
      class="globe-container"
    ></div>
  </div>
</template>

<style scoped>
  .section-header {
    margin-bottom: 0;
  }

  .globe-container {
    cursor: grab;
  }
</style>

<style>
  .globe-home-label {
    padding: var(--ja-spacing-2x-small) var(--ja-spacing-small);
    border: 1px solid color-mix(in srgb, var(--ja-color-purple-400) 60%, transparent);
    border-radius: var(--ja-border-radius-pill);
    background: color-mix(in srgb, var(--ja-color-neutral-950) 70%, transparent);
    box-shadow: 0 0 12px color-mix(in srgb, var(--ja-color-purple-400) 30%, transparent);
    color: var(--ja-color-purple-400);
    font-size: var(--ja-font-size-small);
    font-weight: var(--ja-font-weight-semibold);
  }
</style>
