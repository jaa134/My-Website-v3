<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { CylinderGeometry, Group, Mesh, MeshLambertMaterial, Object3D, SphereGeometry } from 'three';
  import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

  import { useGlobe } from '@/composables/useGlobe.js';

  import BasicCard from '@/components/common/BasicCard.vue';
  import SectionHeader from '@/components/common/SectionHeader.vue';

  /* Places ///////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Place {
    name: string;
    location: string;
    date: string;
    image: string;
    lat: number;
    lng: number;
  }

  const places: Place[] = [
    {
      name: 'Hot Air Balloon Festival',
      location: 'Albuquerque',
      date: 'Summer of 2022',
      image: '/assets/images/places/albuquerque.webp',
      lat: 35.0844,
      lng: -106.6504,
    },
    {
      name: 'Extreme Boat Tour',
      location: 'Antigua',
      date: 'Summer of 2019',
      image: '/assets/images/places/antigua.webp',
      lat: 17.0747,
      lng: -61.8175,
    },
    {
      name: 'Family Vacation',
      location: "Barry's Bay",
      date: 'Summer of 2014',
      image: '/assets/images/places/barrysBay.webp',
      lat: 45.4884,
      lng: -77.6784,
    },
    {
      name: 'Beach Work Retreat',
      location: 'Cancún',
      date: 'Winter of 2022',
      image: '/assets/images/places/cancun.webp',
      lat: 21.1619,
      lng: -86.8515,
    },
    {
      name: 'Sky Diving',
      location: 'Cape Town',
      date: 'Spring of 2017',
      image: '/assets/images/places/capeTown.webp',
      lat: -31.9249,
      lng: 17.4241,
    },
    {
      name: 'Safari Trip',
      location: 'Chobe National Park',
      date: 'Spring of 2017',
      image: '/assets/images/places/chobe.webp',
      lat: -18.4256,
      lng: 24.7143,
    },
    {
      name: 'College Graduation',
      location: 'Cleveland',
      date: 'Spring of 2019',
      image: '/assets/images/places/cleveland.webp',
      lat: 41.4993,
      lng: -81.6944,
    },
    {
      name: 'Rock Climbing',
      location: 'Denver',
      date: 'Summer of 2022',
      image: '/assets/images/places/denver.webp',
      lat: 39.7392,
      lng: -104.9903,
    },
    {
      name: 'Wine Tasting',
      location: 'Florence',
      date: 'Fall of 2023',
      image: '/assets/images/places/florence.webp',
      lat: 43.7538,
      lng: 11.2194,
    },
    {
      name: 'Hiking',
      location: 'Garibaldi Provincial Park',
      date: 'Summer of 2022',
      image: '/assets/images/places/garibaldi.webp',
      lat: 48.9167,
      lng: -118.5,
    },
    {
      name: 'Baking in the Heat',
      location: 'Grand Canyon',
      date: 'Summer of 2018',
      image: '/assets/images/places/grandCanyon.webp',
      lat: 36.0544,
      lng: -112.1401,
    },
    {
      name: 'Hiking',
      location: 'Grand Tetons',
      date: 'Summer of 2020',
      image: '/assets/images/places/grandTeton.webp',
      lat: 43.7904,
      lng: -110.6818,
    },
    {
      name: '30th Bithdays',
      location: 'Joshua Tree',
      date: 'Winter of 2025',
      image: '/assets/images/places/joshuaTree.webp',
      lat: 36.5323,
      lng: -116.3125,
    },
    {
      name: '5k Open Water Swimming',
      location: 'Kenosha',
      date: 'Summer of 2014',
      image: '/assets/images/places/kenosha.webp',
      lat: 42.5847,
      lng: -87.8212,
    },
    {
      name: 'Shark Cage Diving',
      location: 'Kleinbaai Harbor',
      date: 'Spring of 2017',
      image: '/assets/images/places/kleinbaai.webp',
      lat: -33.6158,
      lng: 20,
    },
    {
      name: 'Safari Trip',
      location: 'Krueger National Park',
      date: 'Spring of 2017',
      image: '/assets/images/places/kruger.webp',
      lat: -23.9884,
      lng: 31.5547,
    },
    {
      name: 'Fall Kayaking',
      location: 'Lake Tahoe',
      date: 'Fall of 2021',
      image: '/assets/images/places/lakeTahoe.webp',
      lat: 39.2,
      lng: -119.5,
    },
    {
      name: 'Scaling mountains',
      location: 'El Potrero Chico',
      date: 'Spring of 2024',
      image: '/assets/images/places/elPotreroChico.webp',
      lat: 25.9512,
      lng: -100.4766,
    },
    {
      name: 'Family Vacation',
      location: 'Mount Rushmore',
      date: 'Summer of 2015',
      image: '/assets/images/places/mounthRushmore.webp',
      lat: 43.8803,
      lng: -103.4538,
    },
    {
      name: "Getting Lost in the M&M's Store",
      location: 'New York City',
      date: 'Summer of 2018',
      image: '/assets/images/places/newYork.webp',
      lat: 40.7128,
      lng: -74.006,
    },
    {
      name: 'Squaring Up With Grandma',
      location: 'Pflugerville',
      date: 'Summer of 2022',
      image: '/assets/images/places/pflugerville.webp',
      lat: 30.4548,
      lng: -97.6223,
    },
    {
      name: 'Parasailing',
      location: 'Punta Cana',
      date: 'Winter of 2023',
      image: '/assets/images/places/puntaCana.webp',
      lat: 18.5601,
      lng: -68.3725,
    },
    {
      name: 'Sky Ponies',
      location: 'Pyrenees',
      date: 'Fall of 2023',
      image: '/assets/images/places/pyrenees.webp',
      lat: 42.6682,
      lng: 1.4461,
    },
    {
      name: 'The Colosseum',
      location: 'Rome',
      date: 'Fall of 2023',
      image: '/assets/images/places/rome.webp',
      lat: 41.5871,
      lng: 13.3192,
    },
    {
      name: 'Walking Downtown',
      location: 'San Francisco',
      date: 'Fall of 2022',
      image: '/assets/images/places/sanFrancisco.webp',
      lat: 37.7749,
      lng: -122.4194,
    },
    {
      name: 'Surf Lessons',
      location: 'Sayulita',
      date: 'Spring of 2025',
      image: '/assets/images/places/sayulita.webp',
      lat: 20.7157,
      lng: -105.2167,
    },
    {
      name: 'Fishing',
      location: 'Smith Lake',
      date: 'Summer of 2017',
      image: '/assets/images/places/smithLake.webp',
      lat: 34.0478,
      lng: -87.0249,
    },
    {
      name: 'Company Retreat',
      location: 'Split',
      date: 'Summer of 2025',
      image: '/assets/images/places/split.webp',
      lat: 43.5089,
      lng: 16.4414,
    },
    {
      name: 'Thanksgiving Day',
      location: 'St. Louis',
      date: 'Fall of 2021',
      image: '/assets/images/places/stLouis.webp',
      lat: 38.627,
      lng: -90.1994,
    },
    {
      name: 'Starfish Whisperer',
      location: 'Stone Town',
      date: 'Spring of 2017',
      image: '/assets/images/places/zanzibar.webp',
      lat: -6.1622,
      lng: 39.1921,
    },
    {
      name: 'Honeymoon',
      location: 'Tamarindo',
      date: 'Fall of 2024',
      image: '/assets/images/places/tamarindo.webp',
      lat: 10.2667,
      lng: -85.6667,
    },
    {
      name: 'Morning Baguettes',
      location: 'Toulouse',
      date: 'Spring of 2022',
      image: '/assets/images/places/toulouse.webp',
      lat: 45.6047,
      lng: 1.4442,
    },
    {
      name: 'Skiing',
      location: 'Vail',
      date: 'Winter of 2023',
      image: '/assets/images/places/vail.webp',
      lat: 39.6433,
      lng: -108.3781,
    },
    {
      name: 'Peaking Over the Edge',
      location: 'Victoria Falls',
      date: 'Spring of 2017',
      image: '/assets/images/places/victoriaFalls.webp',
      lat: -17.9257,
      lng: 27.8625,
    },
    {
      name: 'Skiing',
      location: 'Whistler',
      date: 'Winter of 2023',
      image: '/assets/images/places/whistler.webp',
      lat: 49.9167,
      lng: -122.75,
    },
  ];

  /* Globe ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const globeSize = 650;
  const defaultPinColor = 0xd38bff;
  const selectedPinColor = 0xa7da4a;

  const { globeInstance, initializeGlobe, destroyGlobe } = useGlobe();

  const globeContainer = ref<HTMLDivElement>();

  onMounted(() => {
    if (!globeContainer.value) {
      return;
    }

    initializeGlobe(globeContainer.value, {
      width: globeSize,
      height: globeSize,
      pov: {
        lat: selectedPlace.value.lat,
        lng: selectedPlace.value.lng,
        altitude: 1.8,
      },
      autoRotate: false,
    });

    if (!globeInstance.value) {
      return;
    }

    // Configure place markers
    globeInstance.value
      .objectsData(places)
      .objectLat((d) => (d as Place).lat)
      .objectLng((d) => (d as Place).lng)
      .objectAltitude(0)
      .objectRotation(() => ({ x: 90 }))
      .objectThreeObject((d) => createPin(d as Place));

    // Configure globe clicks
    globeInstance.value.onGlobeClick(({ lat, lng }) => {
      handleAnyGlobeClick(lat, lng);
    });

    globeInstance.value.onPolygonClick((_polygon, _event, { lat, lng }) => {
      handleAnyGlobeClick(lat, lng);
    });

    globeInstance.value.onObjectClick((_object, _event, { lat, lng }) => {
      handleAnyGlobeClick(lat, lng);
    });
  });

  onBeforeUnmount(() => {
    destroyGlobe();
  });

  const createPin = (place: Place) => {
    const color = place.location === selectedPlace.value.location ? selectedPinColor : defaultPinColor;
    const pinMaterial = new MeshLambertMaterial({ color });

    const stemHeight = 8;
    const headRadius = 1.25;

    const stem = new Mesh(new CylinderGeometry(0.4, 0.4, stemHeight, 20), pinMaterial);
    const head = new Mesh(new SphereGeometry(headRadius, 24, 24), pinMaterial);

    head.position.y = stemHeight / 2 + headRadius;

    const group = new Group();
    group.add(stem, head);
    return group;
  };

  const updatePlacePinColor = (place: Place, color: number | string) => {
    const objects = globeInstance.value?.objectsData();
    const pin = objects?.find((d) => (d as Place).location === place.location) as Place & {
      __threeObjObject?: Object3D;
    };
    if (pin) {
      pin.__threeObjObject?.children.forEach((child) => {
        if (child instanceof Group) {
          child.children.forEach((child) => {
            if (child instanceof Mesh) {
              child.material.color.set(color);
            }
          });
        }
      });
    }
  };

  const handleAnyGlobeClick = (lat: number, lng: number) => {
    const { place, distance } = findClosestPlace(lat, lng);
    if (distance < 2000) {
      selectPlace(place);
    }
  };

  const findClosestPlace = (clickLat: number, clickLng: number) => {
    let closestPlace = places[0]!;
    let minDistance = calculateDistance(clickLat, clickLng, closestPlace.lat, closestPlace.lng);

    for (const place of places) {
      const distance = calculateDistance(clickLat, clickLng, place.lat, place.lng);
      if (distance < minDistance) {
        minDistance = distance;
        closestPlace = place;
      }
    }

    return {
      place: closestPlace,
      distance: minDistance,
    };
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const earthRadius = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
  };

  const moveGlobeToPlace = (place: Place, duration = 1000) => {
    globeInstance.value?.pointOfView({ lat: place.lat, lng: place.lng }, duration);
  };

  /* Selection ////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const selectedPlace = ref<Place>(places[0]!);

  const selectPlace = (place: Place) => {
    selectedPlace.value = place;
  };

  watch(selectedPlace, (newPlace, oldPlace) => {
    if (oldPlace) {
      updatePlacePinColor(oldPlace, defaultPinColor);
    }

    updatePlacePinColor(newPlace, selectedPinColor);
    moveGlobeToPlace(newPlace);
  });
</script>

<template>
  <div class="places-view">
    <SectionHeader
      title="I've been to some places"
      subtitle="but there's still so much more to see"
      alignment="center"
    />
    <div class="layout">
      <div class="connection-line"></div>
      <div class="navigation-list">
        <div class="navigation-list-header">Select a place</div>
        <BasicCard height="300px">
          <div class="navigation-items">
            <button
              v-for="place in places"
              :key="place.location"
              :class="['navigation-item', { active: selectedPlace.location === place.location }]"
              @click="selectPlace(place)"
            >
              <div class="selection-indicator">
                <div class="selection-indicator-fill"></div>
              </div>
              <span class="selection-text">{{ place.location }}</span>
            </button>
          </div>
        </BasicCard>
      </div>
      <div
        ref="globeContainer"
        class="globe-container"
      ></div>
      <div class="place">
        <Transition
          name="place-fade"
          mode="out-in"
        >
          <div
            :key="selectedPlace.location"
            class="place-header"
          >
            {{ selectedPlace.name }}
          </div>
        </Transition>
        <BasicCard height="300px">
          <Transition
            name="place-fade"
            mode="out-in"
          >
            <img
              :key="selectedPlace.location"
              class="place-image"
              :src="selectedPlace.image"
              :alt="selectedPlace.name"
            />
          </Transition>
        </BasicCard>
        <Transition
          name="place-fade"
          mode="out-in"
        >
          <div
            :key="selectedPlace.location"
            class="place-footer"
          >
            {{ selectedPlace.location }} ({{ selectedPlace.date }})
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .places-view {
    width: 100%;
    margin-bottom: calc(var(--ja-spacing-3x-large) * -1);
  }

  .section-header {
    margin-bottom: 0;
  }

  .layout {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--ja-spacing-x-large);
  }

  .connection-line {
    position: absolute;
    width: 100%;
    height: 1px;
    border: 1px dashed var(--ja-color-neutral-400);
  }

  .basic-card {
    width: 300px;
  }

  .globe-container {
    cursor: grab;
  }

  .navigation-list {
    position: relative;
  }

  .navigation-list-header {
    position: absolute;
    top: calc(var(--ja-spacing-2x-large) * -1);
    left: 50%;
    transform: translateX(-50%);
    font-family: var(--ja-font-mono);
    font-size: var(--ja-font-size-small);
    font-weight: var(--ja-font-weight-light);
    color: var(--ja-color-neutral-300);
  }

  .navigation-items {
    display: flex;
    flex-direction: column;
    gap: var(--ja-spacing-3x-small);
    padding: var(--ja-spacing-large);
  }

  .navigation-item {
    display: flex;
    align-items: center;
    gap: var(--ja-spacing-medium);
    padding: var(--ja-spacing-medium) var(--ja-spacing-small) var(--ja-spacing-medium) var(--ja-spacing-medium);
    border: none;
    border-radius: var(--ja-border-radius-x-large);
    background: transparent;
    color: var(--ja-color-neutral-100);
    transition: background-color var(--ja-transition-fast) ease;

    &:hover,
    &.active {
      background-color: color-mix(in srgb, var(--ja-color-purple-400) 15%, transparent);
    }

    &.active {
      .selection-indicator {
        border-color: var(--ja-color-purple-400);
      }

      .selection-indicator-fill {
        opacity: 1;
      }

      .selection-text {
        color: var(--ja-color-neutral-0);
      }
    }
  }

  .selection-indicator {
    width: 20px;
    height: 20px;
    border-radius: var(--ja-border-radius-circle);
    border: 2px solid var(--ja-color-neutral-400);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color var(--ja-transition-fast) ease;
  }

  .selection-indicator-fill {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--ja-color-purple-400);
    opacity: 0;
    transition: opacity var(--ja-transition-fast) ease;
  }

  .selection-text {
    font-size: var(--ja-font-size-medium);
    color: var(--ja-color-neutral-300);
    transition: color var(--ja-transition-fast) ease;
  }

  .place {
    position: relative;
  }

  .place-header,
  .place-footer {
    position: absolute;
    text-align: center;
    white-space: nowrap;
    min-width: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  .place-header {
    top: calc(var(--ja-spacing-3x-large) * -1);
    font-family: var(--ja-font-mono);
    font-size: var(--ja-font-size-large);
    font-weight: var(--ja-font-weight-light);
    color: var(--ja-color-neutral-300);
  }

  .place-footer {
    bottom: calc(var(--ja-spacing-3x-large) * -1);
    font-family: var(--ja-font-mono);
    font-size: var(--ja-font-size-medium);
    color: var(--ja-color-neutral-300);
  }

  .place-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .place-fade-enter-active,
  .place-fade-leave-active {
    transition: opacity var(--ja-transition-fast) ease;
  }

  .place-fade-enter-from,
  .place-fade-leave-to {
    opacity: 0;
  }
</style>
