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

  const globeSize = 800;
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
    globeInstance.pointOfView({ lat: 39.6, lng: -98.5, altitude: 2 });

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
    <div
      ref="globeContainer"
      class="globe-container"
    ></div>
  </div>
</template>

<style scoped>
  .globe-container {
    position: relative;
    margin: 0 auto;
    width: v-bind('globeSize + "px"');
    height: v-bind('globeSize + "px"');
    overflow: hidden;
  }
</style>
