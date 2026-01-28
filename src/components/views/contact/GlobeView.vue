<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import type { GeoJsonProperties } from 'geojson';
  import type { GlobeInstance } from 'globe.gl';
  import Globe from 'globe.gl';
  import { CylinderGeometry, Group, Mesh, MeshLambertMaterial, SphereGeometry } from 'three';
  import { feature } from 'topojson-client';
  import type { Objects, Topology } from 'topojson-specification';
  import { onMounted, onUnmounted, ref } from 'vue';

  /* Constants ////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const globeSize = 650;

  const homeCoordinates = {
    lat: 41.482,
    lng: -81.7982,
  };
  const homeLabel = {
    lat: homeCoordinates.lat + 5,
    lng: homeCoordinates.lng,
    text: 'Lakewood, OH',
  };

  /* Globe instance ////////////////////////////////////////////////////////////////////////////////////////////////// */

  const globeContainer = ref<HTMLDivElement | null>(null);
  let globeInstance: GlobeInstance | null = null;

  /* Initialize globe ////////////////////////////////////////////////////////////////////////////////////////////// */

  onMounted(() => {
    if (!globeContainer.value) {
      return;
    }

    // Create globe instance with transparent background
    globeInstance = new Globe(globeContainer.value, {
      rendererConfig: {
        alpha: true,
        antialias: true,
      },
    });

    // Configure interactions and controls
    globeInstance.enablePointerInteraction(true);
    const controls = globeInstance.controls();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.autoRotate = false;

    // Configure scene
    globeInstance.width(globeSize);
    globeInstance.height(globeSize);
    globeInstance.backgroundColor('rgba(0,0,0,0)');

    // Configure POV
    globeInstance.pointOfView({ lat: 45, lng: -82.5, altitude: 1.75 });

    // Configure atmosphere
    globeInstance.showAtmosphere(true);
    globeInstance.atmosphereColor('rgba(100,13,247,1)');
    globeInstance.atmosphereAltitude(0.1);

    // Configure globe appearance
    globeInstance.globeMaterial(new MeshLambertMaterial({ color: 0x140231 }));
    fetch('/data/globe-topology.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((landTopo: Topology<Objects<GeoJsonProperties>>) => {
        if (!globeInstance) {
          console.error('Globe instance is not initialized.');
          return;
        }

        if (!landTopo.objects.land) {
          console.error('Globe topology is malformed.');
          return;
        }

        const geoJSON = feature(landTopo, landTopo.objects.land);
        if (!('features' in geoJSON)) {
          console.error('Globe GeoJSON is malformed.');
          return;
        }

        globeInstance.polygonsData(geoJSON.features);
        globeInstance.polygonCapMaterial(new MeshLambertMaterial({ color: 0x6055c9 }));
        globeInstance.polygonSideColor(() => 'rgba(0,0,0,0)');
      });

    // Configure position marker
    globeInstance
      .objectsData([homeCoordinates])
      .objectLat((d) => (d as typeof homeCoordinates).lat)
      .objectLng((d) => (d as typeof homeCoordinates).lng)
      .objectAltitude(0)
      .objectRotation(() => {
        return {
          x: 90,
        };
      })
      .objectThreeObject(() => createPin());

    globeInstance
      .htmlElementsData([homeLabel])
      .htmlLat((d) => (d as typeof homeLabel).lat)
      .htmlLng((d) => (d as typeof homeLabel).lng)
      .htmlAltitude(() => 0.1)
      .htmlElement((d) => {
        const el = document.createElement('div');
        el.textContent = (d as typeof homeLabel).text;
        el.style.padding = '4px 12px';
        el.style.border = '1px solid rgba(211, 139, 255, 0.65)';
        el.style.borderRadius = '999px';
        el.style.background = 'rgba(32, 10, 64, 0.75)';
        el.style.boxShadow = '0 0 12px rgba(211, 139, 255, 0.35)';
        el.style.color = 'rgba(211, 139, 255, 0.95)';
        el.style.fontSize = '14px';
        el.style.fontWeight = '500';
        return el;
      });
  });

  /* Tear down globe //////////////////////////////////////////////////////////////////////////////////////////////// */

  onUnmounted(() => {
    if (globeInstance) {
      globeInstance._destructor();
    }
  });

  /* Helpers //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const createPin = () => {
    const stemHeight = 8;
    const headRadius = 1.25;
    const pinMaterial = new MeshLambertMaterial({ color: 0xd38bff });
    const stem = new Mesh(new CylinderGeometry(0.4, 0.4, stemHeight, 20), pinMaterial);
    const head = new Mesh(new SphereGeometry(headRadius, 24, 24), pinMaterial);
    head.position.y = stemHeight / 2 + headRadius;
    const group = new Group();
    group.add(stem, head);
    return group;
  };
</script>

<template>
  <div class="form-view">
    <div class="header">
      <h2 class="title">Trying to find me?</h2>
      <h3 class="subtitle">I'm probably working from home right now.</h3>
    </div>

    <div
      ref="globeContainer"
      class="globe-container"
    ></div>
  </div>
</template>

<style scoped>
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title,
  .subtitle {
    font-weight: var(--ja-font-weight-light);
    line-height: var(--ja-line-height-dense);
    color: var(--ja-color-neutral-300);
    text-align: center;
  }

  .title {
    font-size: var(--ja-font-size-x-large);
  }

  .subtitle {
    font-size: var(--ja-font-size-medium);
  }
</style>
