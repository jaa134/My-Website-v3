<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { onMounted, onUnmounted, ref } from 'vue';
  import Globe, { GlobeInstance } from 'globe.gl';
  import { Group, Mesh, MeshLambertMaterial, SphereGeometry } from 'three';
  import { feature } from 'topojson-client';
  import { twoline2satrec, propagate, SatRec, gstime, eciToGeodetic, radiansToDegrees } from 'satellite.js';

  /* Types ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Satellite {
    satrec: SatRec;
    name: string;
    lat: number;
    lng: number;
    alt: number;
  }

  /* Constants ////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const globeSize = 600;
  const satelliteSize = 1;
  const satelliteHoverSize = 10;
  const timeStep = 1000;

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
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;

    // Configure scene
    globeInstance.width(globeSize);
    globeInstance.height(globeSize);
    globeInstance.backgroundColor('rgba(0,0,0,0)');

    // Configure POV
    globeInstance.pointOfView({ lat: 39.6, lng: -98.5, altitude: 1.45 });

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
      .then((landTopo: TopoJSON.Topology<TopoJSON.Objects<GeoJSON.GeoJsonProperties>>) => {
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

    // Configure satellites
    globeInstance.objectThreeObject(() => createSatelliteMesh());
    fetch('/data/satellites-tle.txt', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
      },
    })
      .then((response) => response.text())
      .then((tleText) => {
        const satellites = parseTleText(tleText);
        animateSatellites(satellites);
      });
  });

  /* Tear down globe //////////////////////////////////////////////////////////////////////////////////////////////// */

  onUnmounted(() => {
    if (globeInstance) {
      globeInstance._destructor();
    }
  });

  /* Helpers //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  function createSatelliteMesh(): Group {
    const group = new Group();

    const satelliteGeometry = new SphereGeometry(satelliteSize);
    const satelliteMaterial = new MeshLambertMaterial({
      color: 'palegreen',
      transparent: true,
      opacity: 0.9,
    });
    const visibleMesh = new Mesh(satelliteGeometry, satelliteMaterial);
    group.add(visibleMesh);

    const hoverGeometry = new SphereGeometry(satelliteHoverSize);
    const hoverMaterial = new MeshLambertMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const hoverMesh = new Mesh(hoverGeometry, hoverMaterial);
    group.add(hoverMesh);

    return group;
  }

  function parseTleText(tleText: string): Satellite[] {
    const parsedTleData = tleText
      .replace(/\r/g, '')
      .split(/\n(?=[^12])/)
      .filter((text) => text)
      .map((text) => text.split('\n'));

    return parsedTleData
      .map(([name, ...tle]) => {
        const formattedName = name?.trim().replace(/^0 /, '') ?? 'unknown satellite';

        if (!tle[0] || !tle[1]) {
          console.error(`Bad satellite TLE data for ${formattedName}.`);
          return null;
        }

        const satrec = twoline2satrec(tle[0], tle[1]);
        if (!propagate(satrec, new Date())?.position) {
          console.error(`Failed to propagate satellite position for ${formattedName}.`);
          return null;
        }

        return {
          satrec: twoline2satrec(tle[0], tle[1]),
          name: formattedName,
          lat: 0,
          lng: 0,
          alt: 0,
        };
      })
      .filter((satellite): satellite is Satellite => !!satellite);
  }

  function animateSatellites(satellites: Satellite[]) {
    let time = new Date();

    function _animateSatellites() {
      if (!globeInstance) {
        console.error('Globe instance is not initialized.');
        return;
      }

      requestAnimationFrame(_animateSatellites);

      time = new Date(time.getTime() + timeStep);
      const gmst = gstime(time);

      globeInstance.objectsData(
        satellites.map((satellite) => {
          const data = { ...satellite };
          const eci = propagate(data.satrec, time);

          if (!eci?.position) {
            return {};
          }

          const groundPosition = eciToGeodetic(eci.position, gmst);
          return {
            ...data,
            lat: radiansToDegrees(groundPosition.latitude),
            lng: radiansToDegrees(groundPosition.longitude),
          };
        }),
      );
    }

    _animateSatellites();
  }
</script>

<template>
  <div class="globe-view">
    <div class="tech-section">
      <div class="tech-blurb">Delivering satellites to space with modern tech stacks</div>
      <div class="tech-card">
        <img
          src="@/assets/icons/skills/typescript.svg"
          alt="TypeScript"
          v-tooltip="'TypeScript'"
        />
        <img
          src="@/assets/icons/skills/html.svg"
          alt="HTML"
          v-tooltip="'HTML'"
        />
        <img
          src="@/assets/icons/skills/css.svg"
          alt="CSS"
          v-tooltip="'CSS'"
        />
        <img
          src="@/assets/icons/skills/vue.svg"
          alt="Vue"
          v-tooltip="'Vue'"
        />
        <img
          src="@/assets/icons/skills/react.svg"
          alt="React"
          v-tooltip="'React'"
        />
      </div>
      <div class="tech-card">
        <img
          src="@/assets/icons/skills/vite.svg"
          alt="Vite"
          v-tooltip="'Vite'"
        />
        <img
          src="@/assets/icons/skills/vitest.svg"
          alt="Vitest"
          v-tooltip="'Vitest'"
        />
        <img
          src="@/assets/icons/skills/graphql.svg"
          alt="GraphQL"
          v-tooltip="'GraphQL'"
        />
        <img
          src="@/assets/icons/skills/apollo.svg"
          alt="Apollo"
          v-tooltip="'Apollo'"
        />
        <img
          src="@/assets/icons/skills/pinia.svg"
          alt="Pinia"
          v-tooltip="'Pinia'"
        />
      </div>
      <div class="tech-card">
        <img
          src="@/assets/icons/skills/git.svg"
          alt="Git"
          v-tooltip="'Git'"
        />
        <img
          src="@/assets/icons/skills/docker.svg"
          alt="Docker"
          v-tooltip="'Docker'"
        />
        <img
          src="@/assets/icons/skills/cursor.svg"
          alt="Cursor"
          v-tooltip="'Cursor'"
        />
        <img
          src="@/assets/icons/skills/figma.svg"
          alt="Figma"
          v-tooltip="'Figma'"
        />
        <img
          src="@/assets/icons/skills/jira.svg"
          alt="Jira"
          v-tooltip="'Jira'"
        />
      </div>
    </div>
    <div class="globe-section">
      <div class="count-container">
        <div class="count-dashed-arm angled"></div>
        <div class="count-dashed-arm vertical"></div>
        <div class="count-text">
          <div>15+ satellites</div>
          <div>and counting...</div>
        </div>
      </div>
      <div
        ref="globeContainer"
        class="globe-container"
      ></div>
    </div>
  </div>
</template>

<style scoped>
  .globe-view {
    display: flex;
    align-items: center;
    gap: var(--ja-spacing-4x-large);
  }

  .tech-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--ja-spacing-x-large);
  }

  .tech-blurb {
    font-size: var(--ja-font-size-x-large);
    font-weight: var(--ja-font-weight-light);
    line-height: var(--ja-line-height-dense);
    color: var(--ja-color-neutral-300);
    text-align: center;
    width: 400px;
  }

  .tech-card {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--ja-spacing-small);
    width: 400px;
    height: 100px;
    position: relative;
    background: color-mix(in srgb, var(--ja-color-violet-800) 50%, transparent);
    backdrop-filter: blur(10px);
    border: 1px solid color-mix(in srgb, var(--ja-color-violet-400) 15%, transparent);
    border-radius: var(--ja-border-radius-large);
    transition: all var(--ja-transition-fast) ease;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(
        to right,
        transparent,
        color-mix(in srgb, var(--ja-color-violet-400) 90%, transparent),
        transparent
      );
      opacity: 0;
      transition: opacity var(--ja-transition-fast) ease;
    }

    &:hover {
      border-color: color-mix(in srgb, var(--ja-color-violet-400) 30%, transparent);
      background: color-mix(in srgb, var(--ja-color-violet-950) 40%, transparent);

      &::before {
        opacity: 1;
      }
    }

    img {
      width: 60px;
      height: 60px;
    }
  }

  .globe-section {
    position: relative;
    width: v-bind('globeSize + "px"');
    height: v-bind('globeSize + "px"');
  }

  .count-container {
    position: absolute;
    top: 0;
    right: 0;
    width: 135px;
    height: 100px;
  }

  .count-dashed-arm {
    position: absolute;
    border: 1px dashed var(--ja-color-neutral-400);

    &.angled {
      bottom: 0;
      left: 10px;
      width: 65px;
      height: 1px;
      transform: rotate(-40deg);
    }

    &.vertical {
      position: absolute;
      bottom: 25px;
      left: calc(50% - 0.5px);
      width: 1px;
      height: 25px;
      border: 1px dashed var(--ja-color-neutral-400);
    }
  }

  .count-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: var(--ja-font-mono);
    font-size: var(--ja-font-size-medium);
    font-weight: var(--ja-font-weight-light);
    line-height: var(--ja-line-height-dense);
    text-align: center;

    & > :first-child {
      font-size: var(--ja-font-size-medium);
      color: var(--ja-color-neutral-300);
    }

    & > :last-child {
      font-size: var(--ja-font-size-x-small);
      color: var(--ja-color-neutral-300);
      text-decoration: underline var(--ja-color-neutral-400);
      text-underline-offset: var(--ja-spacing-small);
    }
  }
</style>
