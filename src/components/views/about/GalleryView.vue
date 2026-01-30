<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { computed, ref } from 'vue';
  import { PhotoAlbum } from 'vue-photo-album';

  import PageControls from '@/components/common/PageControls.vue';
  import SectionHeader from '@/components/common/SectionHeader.vue';

  /* Photos ///////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Photo {
    title: string;
    description: string;
    src: string;
    width: number;
    height: number;
  }

  const photos: Photo[] = [
    {
      title: 'Florentine Wine Night - 2023',
      description: 'Enjoying a nice dinner in the basement of a fancy Florentine restaurant.',
      src: '/assets/images/gallery/1dOTOPd4v9.webp',
      width: 2500,
      height: 3333,
    },
    {
      title: 'First Major Hike - 2023',
      description: 'My first major hike after returning from ACL surgery.',
      src: '/assets/images/gallery/kl9c66ye32.webp',
      width: 2016,
      height: 1512,
    },
    {
      title: 'Michelangelo Overlook - 2023',
      description: 'Soaking in the views of Florence.',
      src: '/assets/images/gallery/hx0pa3CCfs.webp',
      width: 2500,
      height: 1875,
    },
    {
      title: 'Colorado Autumn - 2023',
      description: 'Our first fall hike in Colorado. We finally got to see the changing colors.',
      src: '/assets/images/gallery/lpxx539f7c.webp',
      width: 2500,
      height: 1875,
    },
    {
      title: 'Rome Colosseum - 2023',
      description: 'This thing is really old...',
      src: '/assets/images/gallery/NjspQ93mdk.webp',
      width: 2016,
      height: 1512,
    },
    {
      title: 'Pyrenees Mountains - 2023',
      description: 'Met some friendly horses on a mountain hike.',
      src: '/assets/images/gallery/s90cmsj3fC.webp',
      width: 3000,
      height: 2250,
    },
    {
      title: 'Grand Canyon - 2023',
      description: 'Posing in front of a Grand Canyon overlook.',
      src: '/assets/images/gallery/4mvbhty421.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Beerfest - 2023',
      description: 'Posing with Cleveland Guardians mascot.',
      src: '/assets/images/gallery/ax1qew872B.webp',
      width: 1512,
      height: 2016,
    },
    {
      title: 'Sedona Sssnakes - 2023',
      description: 'An animal shelter was handing out snakes on the street.',
      src: '/assets/images/gallery/zlp234XCd4.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Post-Ski Photo Shoot - 2022',
      description: 'Found a random photographer on a short trail. They offered to take our photo!',
      src: '/assets/images/gallery/Hoo3ye9eez.webp',
      width: 1440,
      height: 1800,
    },
    {
      title: 'Whistler - 2023',
      description: 'At the peak in Whistler. Mountain views 360 degrees around us.',
      src: '/assets/images/gallery/Dov4zee4om.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Garibaldi Provincial Park - 2022',
      description: 'Canada just has better outdoor access.',
      src: '/assets/images/gallery/Fae5eph5Ve.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Ready to Eat - 2022',
      description: 'Hungry for pasta on the streets of SF.',
      src: '/assets/images/gallery/Feeg7OPhee.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Maroon Bells - 2023',
      description: "I'll be back to hike 'Four Pass Loop' in 2023.",
      src: '/assets/images/gallery/Maifiegai4.webp',
      width: 1440,
      height: 1800,
    },
    {
      title: 'Golden Gate - 2022',
      description: 'Gelled hair or stroing winds?',
      src: '/assets/images/gallery/Phohkei7oo.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: "Lil Bro's Grad Trip - 2023",
      description: 'We went skiing to celebrate graduating college.',
      src: '/assets/images/gallery/Que7Noo8ot.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Whistler - 2023',
      description: 'Posing with the scenery.',
      src: '/assets/images/gallery/Xah8Aewait.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'French Baguette Run - 2022',
      description: 'Had to stop for breakfast after the morning run, but before work.',
      src: '/assets/images/gallery/Yoh0puesho.webp',
      width: 1512,
      height: 2016,
    },
    {
      title: "Dave's Wedding - 2022",
      description: 'Happy to watch and be a part of this guy getting married.',
      src: '/assets/images/gallery/biedim1Pha.webp',
      width: 3604,
      height: 3264,
    },
    {
      title: 'Family Reunion - 2022',
      description: 'Lounging poolside in Austin, Texas.',
      src: '/assets/images/gallery/ceeW5Uu4ie.webp',
      width: 1600,
      height: 1200,
    },
    {
      title: 'Albuquerque Festival - 2022',
      description: 'Well worth the drive to see 100 hot air balloons fill the sky.',
      src: '/assets/images/gallery/chai7Veeph.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Zanzibar Coastal Waters - 2017',
      description: 'Millions of friendly starfish on the ocean floor.',
      src: '/assets/images/gallery/Oosho9thik.webp',
      width: 1835,
      height: 2448,
    },
    {
      title: 'Whistler - 2023',
      description: "Who doesn't appreciate a cold beer after skiing all day?",
      src: '/assets/images/gallery/chijuib0Ju.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Meow Wolf - 2022',
      description: 'Modern and performative art museum in Denver.',
      src: '/assets/images/gallery/eeLo1shohV.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Three Brothers - 2000',
      description: "Rocking the 90's bowl cut.",
      src: '/assets/images/gallery/eegh4Phuu3.webp',
      width: 3310,
      height: 2364,
    },
    {
      title: 'Climbing Clear Creek - 2022',
      description: 'Who had their phone out this high off the ground?',
      src: '/assets/images/gallery/een3Aitee1.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: "Mount Evan's - 2022",
      description: 'Summitting our first 14er together (even if it was mostly by car).',
      src: '/assets/images/gallery/eiFahbae9i.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Garden of the Gods - 2022',
      description: 'Friends visiting from distant places to climb rocks with me.',
      src: '/assets/images/gallery/iu3Egaif3E.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Vail - 2023',
      description: 'If you zoom in on our goggles, you can see my brother!',
      src: '/assets/images/gallery/iup8Aidohx.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Thanksgiving - 2022',
      description: 'Cousins and I posing for an annual silly photo.',
      src: '/assets/images/gallery/mooGahbai7.webp',
      width: 3600,
      height: 2400,
    },
    {
      title: 'Golden Gate - 2022',
      description: "Aemilee's first time visting San Francisco.",
      src: '/assets/images/gallery/nae3Oojash.webp',
      width: 3088,
      height: 2316,
    },
    {
      title: 'Cancún Retreat - 2022',
      description: 'My first week at Loft Orbital was a trip with strangers to Mexico.',
      src: '/assets/images/gallery/nahNgeiha2.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Arkansas River - 2022',
      description: 'Nearly fell out of the boat on so many occasions.',
      src: '/assets/images/gallery/niGh5Shoh5.webp',
      width: 2001,
      height: 1541,
    },
    {
      title: 'First Multipitch - 2022',
      description: "I'm a long way off the ground. Not nearly as scary as you might think.",
      src: '/assets/images/gallery/no9Uge9ieb.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Second Multipitch - 2022',
      description: 'Even higher off the ground.',
      src: '/assets/images/gallery/ohg3Uibai0.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Mt. Evans - 2022',
      description: 'First 14er summitted enitrely by hiking. Zach is our expert guide.',
      src: '/assets/images/gallery/oniebua7Oh.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Wet Shoes - 2022',
      description: "First winter hike in Colorado. Pike's Peak is sticking up in the background.",
      src: '/assets/images/gallery/ooC4yeethi.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Birthday Weekend - 2022',
      description: '18 mile day hike for my birthday leaves my feet sore, but wanting more!',
      src: '/assets/images/gallery/phohgh4Mee.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Estes Park - 2022',
      description: 'Stay-cation at a nice lodge away from home.',
      src: '/assets/images/gallery/phuD9Queix.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: "Grandma's House - 2022",
      description: 'My neice is adorable. She loves to pose for the camera.',
      src: '/assets/images/gallery/quahTee1ux.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Winter Park - 2022',
      description: 'Jon looks like a professional in this photo.',
      src: '/assets/images/gallery/quo5Zo1aem.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Parasailing - 2023',
      description: 'Company work retreat in the Dominican. We had enough time away from meetings to schedule a flight.',
      src: '/assets/images/gallery/ro1xaiz3Ah.webp',
      width: 3984,
      height: 2656,
    },
    {
      title: 'Thanksgiving - 2022',
      description: 'Most of the gang is here and everyone looks so happy.',
      src: '/assets/images/gallery/roopee3Ief.webp',
      width: 3600,
      height: 2649,
    },
    {
      title: 'Rocky Mountain National Park - 2022',
      description: 'Exploring the outdoors with family.',
      src: '/assets/images/gallery/shex9Ohwoo.webp',
      width: 3024,
      height: 2665,
    },
    {
      title: 'Parasailing - 2023',
      description: 'Getting dunked into the water. Thankfully we only saw turtles swimming around.',
      src: '/assets/images/gallery/uF4uc3oofi.webp',
      width: 3984,
      height: 2656,
    },
    {
      title: 'BBQ - 2022',
      description: "They bet us money that we couldn't finish this family sized meal.",
      src: '/assets/images/gallery/vei8aiS8Ph.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Canyonlands National Park - 2022',
      description: 'A beautiful hike along a ridgeline overlooking wnoderful rock formations.',
      src: '/assets/images/gallery/we3Ni0vie5.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'No Luck - 2022',
      description: 'Nearly got skunked after 4 hours of fishing and only 1 fish.',
      src: '/assets/images/gallery/weu3Hohphe.webp',
      width: 540,
      height: 1200,
    },
    {
      title: 'Fighting Grandma - 2021',
      description: 'Do you think she can take me?',
      src: '/assets/images/gallery/yii8Chuici.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Thanksgiving - 2021',
      description: 'A good photo of me!',
      src: '/assets/images/gallery/7m2FbjvtBR.webp',
      width: 2247,
      height: 3024,
    },
    {
      title: 'Trail Half Marathon - 2020',
      description: 'I love running. I placed 4th out of ~250 in this race!',
      src: '/assets/images/gallery/xhEZaOycWJ.webp',
      width: 6000,
      height: 4000,
    },
    {
      title: 'Thanksgiving - 2020',
      description: 'My dad and little brother having a good laugh',
      src: '/assets/images/gallery/O5WQ7PXP7T.webp',
      width: 3354,
      height: 4494,
    },
    {
      title: 'Utah UTVs - 2019',
      description: 'I never want to get lost in a desert again.',
      src: '/assets/images/gallery/gHIfkZqH7P.webp',
      width: 3088,
      height: 2316,
    },
    {
      title: 'Grand Tetons - 2020',
      description: 'Backpacking... I woke up to a moose hovering over my tent.',
      src: '/assets/images/gallery/GK6GvUHSho.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Rock Climbing - 2021',
      description: 'Climbing with one of the best belayers out there.',
      src: '/assets/images/gallery/rhSI0TIP7Q.webp',
      width: 3000,
      height: 2000,
    },
    {
      title: 'Rock Climbing - 2021',
      description: 'Look how focused I am.',
      src: '/assets/images/gallery/kW1CYFV8ra.webp',
      width: 3000,
      height: 2000,
    },
    {
      title: 'Grand Tetons - 2020',
      description: 'I got paid to setup and launch the hot air balloons behind me.',
      src: '/assets/images/gallery/PdIXNLbgsz.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: "Pike's Peak - 2022",
      description: 'Thin air and strong winds are not a good combination.',
      src: '/assets/images/gallery/a8w4c2lSCT.webp',
      width: 1440,
      height: 1800,
    },
    {
      title: "Pike's Peak - 2022",
      description: 'Sunset drives down a mountain. Happy to be able to breathe again.',
      src: '/assets/images/gallery/ONhrIyerW8.webp',
      width: 1440,
      height: 1800,
    },
    {
      title: "Grandma's Country Home - 2022",
      description: 'Trying my hardest to make my niece laugh.',
      src: '/assets/images/gallery/VN3ISXANh2.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Moving to Colorado - 2021',
      description: 'Saying goodbye to Cleveland!',
      src: '/assets/images/gallery/eHTLdxiah1.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'July 4th Float - 2021',
      description: 'Glad to be around good friends.',
      src: '/assets/images/gallery/KQDWtaYRM2.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'First Time Skiing - 2018',
      description: 'I swear I am much better now.',
      src: '/assets/images/gallery/Ie4gABa8rJ.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'CLE Little Italy - 2021',
      description: "Maxi's is the best Italian restuarant anywhere.",
      src: '/assets/images/gallery/EZMnWVbb7S.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Lake Tahoe - 2021',
      description: 'Never seen more clear water in my life.',
      src: '/assets/images/gallery/9tBRzSjIWa.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Lewis & Clark Trail - 2020',
      description: 'I love my dad.',
      src: '/assets/images/gallery/2NGU67BWMo.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Halloween - 2019',
      description: 'Homemade costumes made by yours truly.',
      src: '/assets/images/gallery/DQRFjLD1r9.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Water Polo Tournament - 2018',
      description: 'A super intense sport that I wish I put more time into.',
      src: '/assets/images/gallery/61ZiKMAT7f.webp',
      width: 6462,
      height: 4327,
    },
    {
      title: 'Grand Canyon - 2018',
      description: 'Hiked all the way down and back out. It was ~120F at the bottom!!!',
      src: '/assets/images/gallery/8Eyu8lpCsy.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Zion National Park - 2021',
      description: "I did not complete Angel's landing...",
      src: '/assets/images/gallery/m2zOmedogZ.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'IM Soccer - 2017',
      description: "Winner's multiple years in a row. I got so muddy as goalie this game.",
      src: '/assets/images/gallery/LZpz9AcjCe.webp',
      width: 1600,
      height: 1199,
    },
    {
      title: 'Family visiting Cleveland - 2021',
      description: 'My older brother is always acting like this.',
      src: '/assets/images/gallery/RHwrqHjiMn.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Float Trip - 2017',
      description: 'The currents were moving a little too slow today.',
      src: '/assets/images/gallery/Ts0QrqaHNq.webp',
      width: 2048,
      height: 1365,
    },
    {
      title: 'Cape Town, SA - 2017',
      description: 'Taken while solo hiking Table Mountain.',
      src: '/assets/images/gallery/V4zwPZYXCf.webp',
      width: 5184,
      height: 3456,
    },
    {
      title: 'Finger Lakes - 2017',
      description: 'I probably didnt catch anything.',
      src: '/assets/images/gallery/Xyo1sW6Ysx.webp',
      width: 2048,
      height: 1365,
    },
    {
      title: 'Sky Diving in South Africa - 2017',
      description: 'I blacked out the first 30 seconds of free fall. This one is a blur.',
      src: '/assets/images/gallery/dSQnM1nANp.webp',
      width: 3024,
      height: 2268,
    },
    {
      title: 'Grand Canyon - 2018',
      description: "Don't take group photos near the cliffs.",
      src: '/assets/images/gallery/h79Lpcm17g.webp',
      width: 1501,
      height: 2000,
    },
    {
      title: 'Jenny Lake - 2018',
      description: 'Such a gorgeous day, killing time with a hike while waiting for friends.',
      src: '/assets/images/gallery/jBYfx8uyXy.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Rocky Mountain National Park - 2017',
      description: 'Found a good spot to sit in the middle of a stream.',
      src: '/assets/images/gallery/nQg9bOZ0ip.webp',
      width: 5184,
      height: 3456,
    },
    {
      title: 'Shark Cage Diving in South Africa - 2017',
      description: 'Code named "flower picking" because we weren\'t supposed to do this.',
      src: '/assets/images/gallery/pWPl4nOfDe.webp',
      width: 5184,
      height: 3456,
    },
    {
      title: 'Panama City, FL - 2016',
      description: 'Sunsets are made even better with friends on the beach.',
      src: '/assets/images/gallery/ua8IIyNGXz.webp',
      width: 5184,
      height: 3456,
    },
    {
      title: 'Grand Canyon - 2018',
      description: 'Little brother and I enjoying what time we can spend together.',
      src: '/assets/images/gallery/ypqCmdMDip.webp',
      width: 720,
      height: 960,
    },
  ];

  /* Display //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const spacing = 12;
  const photosPerPage = 8;
  const pageCount = Math.ceil(photos.length / photosPerPage);

  const page = ref(0);

  const displayedPhotos = computed(() => {
    const startIndex = page.value * photosPerPage;
    const endIndex = (page.value + 1) * photosPerPage;
    return photos.slice(startIndex, endIndex);
  });
</script>

<template>
  <div class="gallery-view">
    <SectionHeader
      title="Gallery"
      subtitle="A glimpse into my life."
      alignment="center"
    />
    <PhotoAlbum
      :photos="displayedPhotos"
      layout="rows"
      :spacing="spacing"
    />
    <PageControls
      v-model="page"
      :page-count="pageCount"
    />
  </div>
</template>

<style scoped>
  .gallery-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1100px;
  }

  .photo-album {
    width: 100%;

    &:deep(.photo-album__photo) {
      border-radius: var(--ja-border-radius-large);
      background-color: color-mix(in srgb, var(--ja-color-neutral-1000) 50%, transparent);
    }
  }

  .page-controls {
    margin-top: var(--ja-spacing-2x-large);
  }
</style>
