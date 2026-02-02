<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { computed, ref } from 'vue';
  import { type Photo as DisplayPhoto, PhotoAlbum } from 'vue-photo-album';

  import PageControls from '@/components/common/PageControls.vue';
  import SectionHeader from '@/components/common/SectionHeader.vue';

  /* Photos ///////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Photo {
    title: string;
    description: string;
    imageSource: string;
    width: number;
    height: number;
  }

  const photos: Photo[] = [
    {
      title: 'Snorkeling - 2026',
      description: 'Swimming with an insane amount of puffer fish.',
      imageSource: '/images/gallery/38DqwERbc7.webp',
      width: 1968,
      height: 2624,
    },
    {
      title: 'Sand Dunes - Summer 2025',
      description: 'Like a day at the beach, but just no water.',
      imageSource: '/images/gallery/4PKHDjIEVn.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Engagment Photos - Fall 2023',
      description: "Still haven't been to a concert here.",
      imageSource: '/images/gallery/852WR3SqhA.webp',
      width: 1806,
      height: 2337,
    },
    {
      title: 'Wedding Day - Fall 2024',
      description: 'Me and my best friend.',
      imageSource: '/images/gallery/9eunnNEAqE.webp',
      width: 2859,
      height: 2076,
    },
    {
      title: "Devil's Head - Summer 2025",
      description: 'Forever my favorite place to camp.',
      imageSource: '/images/gallery/CqGdWDztWw.webp',
      width: 2475,
      height: 1856,
    },
    {
      title: 'Backpacking - Summer 2025',
      description: 'Hiking in the backcountry of the Wind River Range.',
      imageSource: '/images/gallery/LSf1bFCJLY.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Flexxing - Winter 2025',
      description: 'Must have been a warm day at Copper Mountain.',
      imageSource: '/images/gallery/PSDql2bMIN.webp',
      width: 2475,
      height: 1856,
    },
    {
      title: 'Pre-game fun - Fall 2025',
      description: 'Patrol was out and in uniform.',
      imageSource: '/images/gallery/TjyG1GhyXQ.webp',
      width: 1856,
      height: 2475,
    },
    {
      title: 'Clear Creek - Summer 2025',
      description: 'Dropping over waterfalls in a boat.',
      imageSource: '/images/gallery/Vg9Dvypc9h.webp',
      width: 2669,
      height: 1768,
    },
    {
      title: 'RMNP Climb - Spring 2025',
      description: "One of the best climbs I've ever done.",
      imageSource: '/images/gallery/WEj1eAoJN8.webp',
      width: 990,
      height: 1320,
    },
    {
      title: 'Cruxing Out - Spring 2024',
      description: 'Placing my foot high up on a rock face.',
      imageSource: '/images/gallery/XijgG9Tp3W.webp',
      width: 1340,
      height: 1787,
    },
    {
      title: 'Red Rocks - Spring 2024',
      description: 'Much better than going to Vegas.',
      imageSource: '/images/gallery/ZZURrOZPL1.webp',
      width: 1304,
      height: 1738,
    },
    {
      title: 'Via Ferrata - Summer 2025',
      description: 'European alpinism is so cool.',
      imageSource: '/images/gallery/cgUvDT8ura.webp',
      width: 1841,
      height: 2455,
    },
    {
      title: 'Wind River - Summer 2025',
      description: 'Making our own trails in the backcountry.',
      imageSource: '/images/gallery/ctid9GeL7i.webp',
      width: 3427,
      height: 2570,
    },
    {
      title: 'Four Pass Look - Summer 2024',
      description: 'So much vert in the rain.',
      imageSource: '/images/gallery/dDQjC0gI1Y.webp',
      width: 2103,
      height: 1577,
    },
    {
      title: 'Saguaro National Park - Winter 2025',
      description: 'Escaping the cold with friends in Phoenix.',
      imageSource: '/images/gallery/dpNunO0WQs.webp',
      width: 1577,
      height: 2103,
    },
    {
      title: 'Kansas City Chiefs - Fall 2025',
      description: 'Suprised dad with tickets to the game.',
      imageSource: '/images/gallery/jksJwg0u0W.webp',
      width: 2103,
      height: 1577,
    },
    {
      title: 'Surf Lessons - Fall 2024',
      description: 'Not really sure what I was doing here.',
      imageSource: '/images/gallery/t3EbbmZvsn.webp',
      width: 1620,
      height: 1080,
    },
    {
      title: 'The Grand - Summer 2025',
      description: 'Made it to the top of this famous peak.',
      imageSource: '/images/gallery/t8aBWVbGlJ.webp',
      width: 2316,
      height: 3088,
    },
    {
      title: 'Liberty Bell - Summer 2024',
      description: 'Ascent of a famous peak in North Cascades National Park.',
      imageSource: '/images/gallery/x5Qjf8Dc1T.webp',
      width: 3427,
      height: 2570,
    },
    {
      title: 'El Potrero Chico - Spring 2024',
      description: 'Climbing mountains in Mexico.',
      imageSource: '/images/gallery/yaoSwJcGgJ.webp',
      width: 1856,
      height: 2475,
    },
    {
      title: 'Telluride - 2025',
      description: 'We saw Adam Sandler at the Telluride Film Festival.',
      imageSource: '/images/gallery/zNUX8DkF8n.webp',
      width: 1577,
      height: 2103,
    },
    {
      title: 'Florentine Wine Night - 2023',
      description: 'Enjoying a nice dinner in the basement of a fancy Florentine restaurant.',
      imageSource: '/images/gallery/1dOTOPd4v9.webp',
      width: 2500,
      height: 3333,
    },
    {
      title: 'First Major Hike - 2023',
      description: 'My first major hike after returning from ACL surgery.',
      imageSource: '/images/gallery/kl9c66ye32.webp',
      width: 2016,
      height: 1512,
    },
    {
      title: 'Michelangelo Overlook - 2023',
      description: 'Soaking in the views of Florence.',
      imageSource: '/images/gallery/hx0pa3CCfs.webp',
      width: 2500,
      height: 1875,
    },
    {
      title: 'Colorado Autumn - 2023',
      description: 'Our first fall hike in Colorado. We finally got to see the changing colors.',
      imageSource: '/images/gallery/lpxx539f7c.webp',
      width: 2500,
      height: 1875,
    },
    {
      title: 'Rome Colosseum - 2023',
      description: 'This thing is really old...',
      imageSource: '/images/gallery/NjspQ93mdk.webp',
      width: 2016,
      height: 1512,
    },
    {
      title: 'Pyrenees Mountains - 2023',
      description: 'Met some friendly horses on a mountain hike.',
      imageSource: '/images/gallery/s90cmsj3fC.webp',
      width: 3000,
      height: 2250,
    },
    {
      title: 'Grand Canyon - 2023',
      description: 'Posing in front of a Grand Canyon overlook.',
      imageSource: '/images/gallery/4mvbhty421.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Beerfest - 2023',
      description: 'Posing with Cleveland Guardians mascot.',
      imageSource: '/images/gallery/ax1qew872B.webp',
      width: 1512,
      height: 2016,
    },
    {
      title: 'Sedona Sssnakes - 2023',
      description: 'An animal shelter was handing out snakes on the street.',
      imageSource: '/images/gallery/zlp234XCd4.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Post-Ski Photo Shoot - 2022',
      description: 'Found a random photographer on a short trail. They offered to take our photo!',
      imageSource: '/images/gallery/Hoo3ye9eez.webp',
      width: 1440,
      height: 1800,
    },
    {
      title: 'Whistler - 2023',
      description: 'At the peak in Whistler. Mountain views 360 degrees around us.',
      imageSource: '/images/gallery/Dov4zee4om.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Garibaldi Provincial Park - 2022',
      description: 'Canada just has better outdoor access.',
      imageSource: '/images/gallery/Fae5eph5Ve.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Ready to Eat - 2022',
      description: 'Hungry for pasta on the streets of SF.',
      imageSource: '/images/gallery/Feeg7OPhee.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Maroon Bells - 2023',
      description: "I'll be back to hike 'Four Pass Loop' in 2023.",
      imageSource: '/images/gallery/Maifiegai4.webp',
      width: 1440,
      height: 1800,
    },
    {
      title: 'Golden Gate - 2022',
      description: 'Gelled hair or stroing winds?',
      imageSource: '/images/gallery/Phohkei7oo.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: "Lil Bro's Grad Trip - 2023",
      description: 'We went skiing to celebrate graduating college.',
      imageSource: '/images/gallery/Que7Noo8ot.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Whistler - 2023',
      description: 'Posing with the scenery.',
      imageSource: '/images/gallery/Xah8Aewait.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'French Baguette Run - 2022',
      description: 'Had to stop for breakfast after the morning run, but before work.',
      imageSource: '/images/gallery/Yoh0puesho.webp',
      width: 1512,
      height: 2016,
    },
    {
      title: "Dave's Wedding - 2022",
      description: 'Happy to watch and be a part of this guy getting married.',
      imageSource: '/images/gallery/biedim1Pha.webp',
      width: 3604,
      height: 3264,
    },
    {
      title: 'Family Reunion - 2022',
      description: 'Lounging poolside in Austin, Texas.',
      imageSource: '/images/gallery/ceeW5Uu4ie.webp',
      width: 1600,
      height: 1200,
    },
    {
      title: 'Albuquerque Festival - 2022',
      description: 'Well worth the drive to see 100 hot air balloons fill the sky.',
      imageSource: '/images/gallery/chai7Veeph.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Zanzibar Coastal Waters - 2017',
      description: 'Millions of friendly starfish on the ocean floor.',
      imageSource: '/images/gallery/Oosho9thik.webp',
      width: 1835,
      height: 2448,
    },
    {
      title: 'Whistler - 2023',
      description: "Who doesn't appreciate a cold beer after skiing all day?",
      imageSource: '/images/gallery/chijuib0Ju.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Meow Wolf - 2022',
      description: 'Modern and performative art museum in Denver.',
      imageSource: '/images/gallery/eeLo1shohV.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Three Brothers - 2000',
      description: "Rocking the 90's bowl cut.",
      imageSource: '/images/gallery/eegh4Phuu3.webp',
      width: 3310,
      height: 2364,
    },
    {
      title: 'Climbing Clear Creek - 2022',
      description: 'Who had their phone out this high off the ground?',
      imageSource: '/images/gallery/een3Aitee1.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: "Mount Evan's - 2022",
      description: 'Summitting our first 14er together (even if it was mostly by car).',
      imageSource: '/images/gallery/eiFahbae9i.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Garden of the Gods - 2022',
      description: 'Friends visiting from distant places to climb rocks with me.',
      imageSource: '/images/gallery/iu3Egaif3E.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Vail - 2023',
      description: 'If you zoom in on our goggles, you can see my brother!',
      imageSource: '/images/gallery/iup8Aidohx.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Thanksgiving - 2022',
      description: 'Cousins and I posing for an annual silly photo.',
      imageSource: '/images/gallery/mooGahbai7.webp',
      width: 3600,
      height: 2400,
    },
    {
      title: 'Golden Gate - 2022',
      description: "Aemilee's first time visiting San Francisco.",
      imageSource: '/images/gallery/nae3Oojash.webp',
      width: 3088,
      height: 2316,
    },
    {
      title: 'Cancún Retreat - 2022',
      description: 'My first week at Loft Orbital was a trip with strangers to Mexico.',
      imageSource: '/images/gallery/nahNgeiha2.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Arkansas River - 2022',
      description: 'Nearly fell out of the boat on so many occasions.',
      imageSource: '/images/gallery/niGh5Shoh5.webp',
      width: 2001,
      height: 1541,
    },
    {
      title: 'First Multipitch - 2022',
      description: "I'm a long way off the ground. Not nearly as scary as you might think.",
      imageSource: '/images/gallery/no9Uge9ieb.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Second Multipitch - 2022',
      description: 'Even higher off the ground.',
      imageSource: '/images/gallery/ohg3Uibai0.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Mt. Evans - 2022',
      description: 'First 14er summited entirely by hiking. Zach is our expert guide.',
      imageSource: '/images/gallery/oniebua7Oh.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Wet Shoes - 2022',
      description: "First winter hike in Colorado. Pike's Peak is sticking up in the background.",
      imageSource: '/images/gallery/ooC4yeethi.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Birthday Weekend - 2022',
      description: '18 mile day hike for my birthday leaves my feet sore, but wanting more!',
      imageSource: '/images/gallery/phohgh4Mee.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Estes Park - 2022',
      description: 'Stay-cation at a nice lodge away from home.',
      imageSource: '/images/gallery/phuD9Queix.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: "Grandma's House - 2022",
      description: 'My niece is adorable. She loves to pose for the camera.',
      imageSource: '/images/gallery/quahTee1ux.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Winter Park - 2022',
      description: 'Jon looks like a professional in this photo.',
      imageSource: '/images/gallery/quo5Zo1aem.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Parasailing - 2023',
      description: 'Company work retreat in the Dominican. We had enough time away from meetings to schedule a flight.',
      imageSource: '/images/gallery/ro1xaiz3Ah.webp',
      width: 3984,
      height: 2656,
    },
    {
      title: 'Thanksgiving - 2022',
      description: 'Most of the gang is here and everyone looks so happy.',
      imageSource: '/images/gallery/roopee3Ief.webp',
      width: 3600,
      height: 2649,
    },
    {
      title: 'Rocky Mountain National Park - 2022',
      description: 'Exploring the outdoors with family.',
      imageSource: '/images/gallery/shex9Ohwoo.webp',
      width: 3024,
      height: 2665,
    },
    {
      title: 'Parasailing - 2023',
      description: 'Getting dunked into the water. Thankfully we only saw turtles swimming around.',
      imageSource: '/images/gallery/uF4uc3oofi.webp',
      width: 3984,
      height: 2656,
    },
    {
      title: 'BBQ - 2022',
      description: "They bet us money that we couldn't finish this family sized meal.",
      imageSource: '/images/gallery/vei8aiS8Ph.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Canyonlands National Park - 2022',
      description: 'A beautiful hike along a ridgeline overlooking wnoderful rock formations.',
      imageSource: '/images/gallery/we3Ni0vie5.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'No Luck - 2022',
      description: 'Nearly got skunked after 4 hours of fishing and only 1 fish.',
      imageSource: '/images/gallery/weu3Hohphe.webp',
      width: 540,
      height: 1200,
    },
    {
      title: 'Fighting Grandma - 2021',
      description: 'Do you think she can take me?',
      imageSource: '/images/gallery/yii8Chuici.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Thanksgiving - 2021',
      description: 'A good photo of me!',
      imageSource: '/images/gallery/7m2FbjvtBR.webp',
      width: 2247,
      height: 3024,
    },
    {
      title: 'Trail Half Marathon - 2020',
      description: 'I love running. I placed 4th out of ~250 in this race!',
      imageSource: '/images/gallery/xhEZaOycWJ.webp',
      width: 6000,
      height: 4000,
    },
    {
      title: 'Thanksgiving - 2020',
      description: 'My dad and little brother having a good laugh',
      imageSource: '/images/gallery/O5WQ7PXP7T.webp',
      width: 3354,
      height: 4494,
    },
    {
      title: 'Utah UTVs - 2019',
      description: 'I never want to get lost in a desert again.',
      imageSource: '/images/gallery/gHIfkZqH7P.webp',
      width: 3088,
      height: 2316,
    },
    {
      title: 'Grand Tetons - 2020',
      description: 'Backpacking... I woke up to a moose hovering over my tent.',
      imageSource: '/images/gallery/GK6GvUHSho.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Rock Climbing - 2021',
      description: 'Climbing with one of the best belayers out there.',
      imageSource: '/images/gallery/rhSI0TIP7Q.webp',
      width: 3000,
      height: 2000,
    },
    {
      title: 'Rock Climbing - 2021',
      description: 'Look how focused I am.',
      imageSource: '/images/gallery/kW1CYFV8ra.webp',
      width: 3000,
      height: 2000,
    },
    {
      title: 'Grand Tetons - 2020',
      description: 'I got paid to setup and launch the hot air balloons behind me.',
      imageSource: '/images/gallery/PdIXNLbgsz.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: "Pike's Peak - 2022",
      description: 'Thin air and strong winds are not a good combination.',
      imageSource: '/images/gallery/a8w4c2lSCT.webp',
      width: 1440,
      height: 1800,
    },
    {
      title: "Pike's Peak - 2022",
      description: 'Sunset drives down a mountain. Happy to be able to breathe again.',
      imageSource: '/images/gallery/ONhrIyerW8.webp',
      width: 1440,
      height: 1800,
    },
    {
      title: "Grandma's Country Home - 2022",
      description: 'Trying my hardest to make my niece laugh.',
      imageSource: '/images/gallery/VN3ISXANh2.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Moving to Colorado - 2021',
      description: 'Saying goodbye to Cleveland!',
      imageSource: '/images/gallery/eHTLdxiah1.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'July 4th Float - 2021',
      description: 'Glad to be around good friends.',
      imageSource: '/images/gallery/KQDWtaYRM2.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'First Time Skiing - 2018',
      description: 'I swear I am much better now.',
      imageSource: '/images/gallery/Ie4gABa8rJ.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'CLE Little Italy - 2021',
      description: "Maxi's is the best Italian restuarant anywhere.",
      imageSource: '/images/gallery/EZMnWVbb7S.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Lake Tahoe - 2021',
      description: 'Never seen more clear water in my life.',
      imageSource: '/images/gallery/9tBRzSjIWa.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Lewis & Clark Trail - 2020',
      description: 'I love my dad.',
      imageSource: '/images/gallery/2NGU67BWMo.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Halloween - 2019',
      description: 'Homemade costumes made by yours truly.',
      imageSource: '/images/gallery/DQRFjLD1r9.webp',
      width: 3024,
      height: 4032,
    },
    {
      title: 'Water Polo Tournament - 2018',
      description: 'A super intense sport that I wish I put more time into.',
      imageSource: '/images/gallery/61ZiKMAT7f.webp',
      width: 6462,
      height: 4327,
    },
    {
      title: 'Grand Canyon - 2018',
      description: 'Hiked all the way down and back out. It was ~120F at the bottom!!!',
      imageSource: '/images/gallery/8Eyu8lpCsy.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Zion National Park - 2021',
      description: "I did not complete Angel's landing...",
      imageSource: '/images/gallery/m2zOmedogZ.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'IM Soccer - 2017',
      description: "Winner's multiple years in a row. I got so muddy as goalie this game.",
      imageSource: '/images/gallery/LZpz9AcjCe.webp',
      width: 1600,
      height: 1199,
    },
    {
      title: 'Family visiting Cleveland - 2021',
      description: 'My older brother is always acting like this.',
      imageSource: '/images/gallery/RHwrqHjiMn.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Float Trip - 2017',
      description: 'The currents were moving a little too slow today.',
      imageSource: '/images/gallery/Ts0QrqaHNq.webp',
      width: 2048,
      height: 1365,
    },
    {
      title: 'Cape Town, SA - 2017',
      description: 'Taken while solo hiking Table Mountain.',
      imageSource: '/images/gallery/V4zwPZYXCf.webp',
      width: 5184,
      height: 3456,
    },
    {
      title: 'Finger Lakes - 2017',
      description: 'I probably didnt catch anything.',
      imageSource: '/images/gallery/Xyo1sW6Ysx.webp',
      width: 2048,
      height: 1365,
    },
    {
      title: 'Sky Diving in South Africa - 2017',
      description: 'I blacked out the first 30 seconds of free fall. This one is a blur.',
      imageSource: '/images/gallery/dSQnM1nANp.webp',
      width: 3024,
      height: 2268,
    },
    {
      title: 'Grand Canyon - 2018',
      description: "Don't take group photos near the cliffs.",
      imageSource: '/images/gallery/h79Lpcm17g.webp',
      width: 1501,
      height: 2000,
    },
    {
      title: 'Jenny Lake - 2018',
      description: 'Such a gorgeous day, killing time with a hike while waiting for friends.',
      imageSource: '/images/gallery/jBYfx8uyXy.webp',
      width: 4032,
      height: 3024,
    },
    {
      title: 'Rocky Mountain National Park - 2017',
      description: 'Found a good spot to sit in the middle of a stream.',
      imageSource: '/images/gallery/nQg9bOZ0ip.webp',
      width: 5184,
      height: 3456,
    },
    {
      title: 'Shark Cage Diving in South Africa - 2017',
      description: 'Code named "flower picking" because we weren\'t supposed to do this.',
      imageSource: '/images/gallery/pWPl4nOfDe.webp',
      width: 5184,
      height: 3456,
    },
    {
      title: 'Panama City, FL - 2016',
      description: 'Sunsets are made even better with friends on the beach.',
      imageSource: '/images/gallery/ua8IIyNGXz.webp',
      width: 5184,
      height: 3456,
    },
    {
      title: 'Grand Canyon - 2018',
      description: 'Little brother and I enjoying what time we can spend together.',
      imageSource: '/images/gallery/ypqCmdMDip.webp',
      width: 720,
      height: 960,
    },
  ];

  /* Display //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const spacing = 12;
  const photosPerPage = 8;
  const pageCount = Math.ceil(photos.length / photosPerPage);

  const page = ref(0);

  const displayedPhotos = computed<DisplayPhoto[]>(() => {
    const startIndex = page.value * photosPerPage;
    const endIndex = (page.value + 1) * photosPerPage;
    return photos.slice(startIndex, endIndex).map((photo) => ({
      title: photo.title,
      alt: photo.description,
      src: photo.imageSource,
      width: photo.width,
      height: photo.height,
    }));
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
