<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import type { SatRec } from 'satellite.js';
  import { eciToGeodetic, gstime, propagate, radiansToDegrees, twoline2satrec } from 'satellite.js';
  import { Group, Mesh, MeshLambertMaterial, SphereGeometry } from 'three';
  import { onBeforeUnmount, onMounted, ref } from 'vue';

  import BasicCard from '@/components/common/BasicCard.vue';

  import ApolloIcon from '@/assets/icons/skills/apollo.svg';
  import CssIcon from '@/assets/icons/skills/css.svg';
  import CursorIcon from '@/assets/icons/skills/cursor.svg';
  import DockerIcon from '@/assets/icons/skills/docker.svg';
  import FigmaIcon from '@/assets/icons/skills/figma.svg';
  import GitIcon from '@/assets/icons/skills/git.svg';
  import GraphqlIcon from '@/assets/icons/skills/graphql.svg';
  import HtmlIcon from '@/assets/icons/skills/html.svg';
  import JiraIcon from '@/assets/icons/skills/jira.svg';
  import PiniaIcon from '@/assets/icons/skills/pinia.svg';
  import ReactIcon from '@/assets/icons/skills/react.svg';
  import TypescriptIcon from '@/assets/icons/skills/typescript.svg';
  import ViteIcon from '@/assets/icons/skills/vite.svg';
  import VitestIcon from '@/assets/icons/skills/vitest.svg';
  import VueIcon from '@/assets/icons/skills/vue.svg';
  import { useGlobe } from '@/composables/useGlobe.js';

  /* Tools ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Tool {
    name: string;
    icon: string;
  }

  const toolGroups: Tool[][] = [
    [
      { name: 'TypeScript', icon: TypescriptIcon },
      { name: 'HTML', icon: HtmlIcon },
      { name: 'CSS', icon: CssIcon },
      { name: 'Vue', icon: VueIcon },
      { name: 'React', icon: ReactIcon },
    ],
    [
      { name: 'Vite', icon: ViteIcon },
      { name: 'Vitest', icon: VitestIcon },
      { name: 'GraphQL', icon: GraphqlIcon },
      { name: 'Apollo', icon: ApolloIcon },
      { name: 'Pinia', icon: PiniaIcon },
    ],
    [
      { name: 'Git', icon: GitIcon },
      { name: 'Docker', icon: DockerIcon },
      { name: 'Cursor', icon: CursorIcon },
      { name: 'Figma', icon: FigmaIcon },
      { name: 'Jira', icon: JiraIcon },
    ],
  ];

  /* Globe ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Satellite {
    satrec: SatRec;
    name: string;
    lat: number;
    lng: number;
    alt: number;
  }

  const globeSize = 600;
  const satelliteSize = 1;
  const satelliteHoverSize = 10;
  const timeStep = 1000;

  const { globeInstance, initializeGlobe, destroyGlobe } = useGlobe();

  const globeContainer = ref<HTMLDivElement>();

  onMounted(() => {
    if (!globeContainer.value) {
      return;
    }

    initializeGlobe(globeContainer.value, {
      width: globeSize,
      height: globeSize,
      pov: { lat: 39.6, lng: -98.5, altitude: 1.5 },
      autoRotate: true,
    });

    if (!globeInstance.value) {
      return;
    }

    // Configure satellites
    globeInstance.value.objectThreeObject(() => createSatelliteMesh());
    globeInstance.value.objectAltitude(0.05);
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

  onBeforeUnmount(() => {
    destroyGlobe();
  });

  const createSatelliteMesh = (): Group => {
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
  };

  const parseTleText = (tleText: string): Satellite[] => {
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
  };

  const animateSatellites = (satellites: Satellite[]) => {
    let time = new Date();

    const updateSatellitesFrame = () => {
      requestAnimationFrame(updateSatellitesFrame);

      if (!globeInstance.value) {
        return;
      }

      time = new Date(time.getTime() + timeStep);
      const gmst = gstime(time);

      globeInstance.value.objectsData(
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
    };

    updateSatellitesFrame();
  };
</script>

<template>
  <div class="globe-view">
    <div class="tech-section">
      <div class="tech-blurb">Delivering satellites to space with modern tech stacks</div>
      <BasicCard
        v-for="(toolGroup, index) in toolGroups"
        :key="index"
        class="tech-card"
      >
        <component
          :is="tool.icon"
          v-for="tool in toolGroup"
          :key="tool.name"
          v-tooltip="tool.name"
        />
      </BasicCard>
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
    padding: var(--ja-spacing-3x-large);

    svg {
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
