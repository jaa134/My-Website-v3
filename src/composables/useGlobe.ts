/* Imports ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

import type { GeoJsonProperties } from 'geojson';
import type { GlobeInstance } from 'globe.gl';
import Globe from 'globe.gl';
import { MeshLambertMaterial } from 'three';
import { feature } from 'topojson-client';
import type { Objects, Topology } from 'topojson-specification';
import { ref } from 'vue';

/* Types ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

interface GlobeOptions {
  width: number;
  height: number;
  pov: { lat: number; lng: number; altitude: number };
  autoRotate: boolean;
}

/* Create /////////////////////////////////////////////////////////////////////////////////////////////////////////// */

const createGlobeInstance = (container: HTMLElement, options: GlobeOptions) => {
  // Create globe instance
  const globeInstance = new Globe(container, {
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
  controls.autoRotate = options.autoRotate;
  controls.autoRotateSpeed = 0.3;

  // Configure scene
  globeInstance.width(options.width);
  globeInstance.height(options.height);
  globeInstance.backgroundColor('rgba(0,0,0,0)');

  // Configure POV
  globeInstance.pointOfView(options.pov);

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

  return globeInstance;
};

/* Compose ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

export const useGlobe = () => {
  const globeInstance = ref<GlobeInstance | null>(null);

  return {
    globeInstance,
    initializeGlobe: (container: HTMLElement, options: GlobeOptions) => {
      if (globeInstance.value) {
        return;
      }

      globeInstance.value = createGlobeInstance(container, options);
    },
    destroyGlobe: () => {
      if (!globeInstance.value) {
        return;
      }

      globeInstance.value._destructor();
      globeInstance.value = null;
    },
  };
};
