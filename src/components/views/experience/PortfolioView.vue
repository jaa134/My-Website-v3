<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { nextTick, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';

  import ClickIcon from '@/assets/icons/actions/click.svg';
  import ExpandIcon from '@/assets/icons/actions/expand.svg';
  import NavigateIcon from '@/assets/icons/actions/navigate.svg';

  import BasicCard from '@/components/common/BasicCard.vue';

  /* Projects /////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Project {
    name: string;
    link: string;
    description: string[];
  }

  const projects: Project[] = [
    {
      name: 'CWRUded',
      link: 'https://github.com/jaa134/CWRUded-iOS_App',
      description: [
        'Founded first company in college to surface real-time campus "busyness" metrics',
        'Led development of a data-driven web service (Node.js, MongoDB, React) and iOS app',
        'Leveraged address resolution protocol (ARP) and Cisco Prime Infrastructure API to aggregate active clients across campus wireless access points',
        'Devised algorithms to infer and forecast crowd levels across campus',
        'Planned and led meetings with deans, network admins, and IT marketing to pilot and promote the product',
      ],
    },
    {
      name: 'Synchrony',
      link: 'https://github.com/jaa134/Synchrony',
      description: [
        'Led development of a synchronized streaming service (piggy-backing off Spotify API) enabling shared playlist collaboration and discovery',
        'Designed and implemented an accessible, mobile-optimized user interface, meeting accessibility standards while prioritizing usability on smartphones',
        'Recognized with academic honors for the year’s most outstanding electrical engineering and computer science department capstone project',
      ],
    },
    {
      name: 'Personal Website v3',
      link: 'https://github.com/jaa134/My-Website-v3',
      description: [
        'Designed and built the latest iteration of my personal website using Vue, Vite, and TypeScript',
        'Created an internal design system to ensure consistent styling and reusable UI components',
        'Integrated advanced rendering and visualization using Three.js and Globe.gl',
        'Focused on performance, maintainability, and minimal reliance on external libraries',
      ],
    },
    {
      name: 'Personal Website v2',
      link: 'https://github.com/jaa134/My-Website-v2',
      description: [
        'Built and deployed a full React application using React 16, Webpack, and TypeScript',
        'Iterated on visual design concepts, typography, and color systems to explore personal branding',
        'Implemented responsive layouts for desktop and mobile devices',
        'Used as a rapid prototype to experiment with UI ideas later refined in newer versions',
      ],
    },
    {
      name: 'Personal Website v1',
      link: 'https://github.com/jaa134/My-Website',
      description: [
        'Built the first version of my personal website when I was initially learning web development',
        'Experimented with foundational HTML, CSS, and JavaScript concepts',
        'Served as an early creative outlet and learning milestone in my web development journey',
        'Sparked a long-term interest in building for the web and set me on my current career path',
      ],
    },
    {
      name: 'Game Breaker',
      link: 'https://github.com/jaa134/WordGames',
      description: [
        'Built a web application that helps players make strategic decisions in popular games',
        'Designed interactive tools to analyze game scenarios and recommend optimal choices',
        'Focused on clear UX and fast feedback to support real-time decision making',
        'Explored data-driven approaches to improve player strategy and outcomes',
      ],
    },
    {
      name: 'PiClock',
      link: 'https://github.com/jaa134/PiClock',
      description: [
        'Built a Raspberry Pi–powered alarm clock that requires users to complete tasks before silencing the alarm',
        'Designed and implemented interactive games including arithmetic challenges, hangman, and tic-tac-toe',
        'Integrated hardware components such as a buzzer with software-driven control logic',
        'Explored human-centered design by gamifying wake-up routines to encourage engagement',
      ],
    },
    {
      name: 'Email Spoofer',
      link: 'https://github.com/jaa134/Email-Spoofer',
      description: [
        'Built a MATLAB application to explore email protocols and server communication',
        'Let users spoof their email address and send emails to any recipient',
        'Implemented a simple GUI to experiment with email header configuration and message sending',
        'Used the project as a learning exercise to understand how SMTP and email systems work',
      ],
    },
    {
      name: 'Media Center',
      link: 'https://github.com/jaa134/Media-Center',
      description: [
        'Built a Raspberry Pi media center that turned old TVs into smart TVs',
        'Streamed video and music from multiple sources seamlessly',
        'Customizable interface for personalized media organization',
        'Lightweight, low-cost alternative to commercial streaming devices',
      ],
    },
    {
      name: 'Trivia App',
      link: 'https://github.com/jaa134/TriviaApp-TriviaServer',
      description: [
        'Developed an iOS trivia app with a Node.js + Express backend',
        'Enabled users to play self-hosted multiplayer trivia games',
        'Handled real-time game state and score tracking',
        'Designed intuitive UI for seamless gameplay experience',
      ],
    },
    {
      name: 'Anagram Solver',
      link: 'https://github.com/jaa134/Anagram-Solver',
      description: [
        'Created a Java program to generate all possible words from given letters',
        'Ingested word lists to efficiently solve complex anagram puzzles',
        'Optimized algorithm for speed and accuracy in real-time use',
        'Applied the tool to solve NYT Spelling Bee challenges',
      ],
    },
  ];

  const expandedProject = shallowRef<Project | null>(null);

  const expandProject = async (project: Project) => {
    expandedProject.value = expandedProject.value?.name === project.name ? null : project;
    await nextTick();
    calculateScrollPosition();
    scrollToExpandedContent();
  };

  /* Scrolling ////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const scrollingElement = ref<HTMLElement>();

  enum ScrollPosition {
    Top = 'Top',
    Middle = 'Middle',
    Bottom = 'Bottom',
  }

  const scrollPosition = ref<ScrollPosition | null>(ScrollPosition.Top);

  const calculateScrollPosition = () => {
    if (!scrollingElement.value) {
      scrollPosition.value = null;
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = scrollingElement.value;

    if (scrollTop === 0) {
      scrollPosition.value = ScrollPosition.Top;
    } else if (Math.abs(scrollHeight - clientHeight - scrollTop) <= 1) {
      scrollPosition.value = ScrollPosition.Bottom;
    } else {
      scrollPosition.value = ScrollPosition.Middle;
    }
  };

  const scrollToExpandedContent = () => {
    const expandedContentElement = scrollingElement.value?.querySelector('.expanded-content');
    expandedContentElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  };

  onMounted(() => {
    scrollingElement.value?.addEventListener('scroll', calculateScrollPosition);
  });

  onBeforeUnmount(() => {
    scrollingElement.value?.removeEventListener('scroll', calculateScrollPosition);
  });
</script>

<template>
  <div class="portfolio-view">
    <div class="header">
      <div class="header-text">
        <h2 class="title">Portfolio</h2>
        <h3 class="subtitle">The projects I've worked on</h3>
      </div>
      <div class="header-actions">
        <a
          href="https://github.com/jaa134"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button class="action-button">
            <ClickIcon class="action-button-icon" />
            <span>View on GitHub</span>
          </button>
        </a>
      </div>
    </div>
    <BasicCard class="portfolio-card">
      <div :class="['card-shadow', { active: scrollPosition && scrollPosition !== ScrollPosition.Top }]"></div>
      <div
        ref="scrollingElement"
        class="card-scroller"
      >
        <template
          v-for="(project, projectIndex) in projects"
          :key="project.name"
        >
          <div class="accordion-item">
            <div :class="['project', { expanded: expandedProject?.name === project.name }]">
              <button
                v-tooltip="'Expand'"
                class="expand-button"
                @click="expandProject(project)"
              >
                <ExpandIcon />
              </button>
              <span class="project-name">
                {{ project.name }}
              </span>
              <a
                v-tooltip="'Open repository'"
                class="navigation-link"
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <NavigateIcon />
              </a>
            </div>
            <div
              v-if="expandedProject?.name === project.name"
              class="expanded-content"
            >
              <ul class="project-description">
                <li
                  v-for="(item, itemIndex) in project.description"
                  :key="itemIndex"
                >
                  {{ item }}
                </li>
              </ul>
              <p class="project-call-to-action">View this project on GitHub to learn more.</p>
            </div>
          </div>
          <div
            v-if="projectIndex < projects.length - 1"
            class="divider"
          ></div>
        </template>
      </div>
      <div :class="['card-shadow', { active: scrollPosition && scrollPosition !== ScrollPosition.Bottom }]"></div>
    </BasicCard>
  </div>
</template>

<style scoped>
  .portfolio-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1100px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    margin-bottom: var(--ja-spacing-x-large);
  }

  .header-text {
    display: flex;
    flex-direction: column;
  }

  .title,
  .subtitle {
    font-weight: var(--ja-font-weight-light);
    line-height: var(--ja-line-height-dense);
    color: var(--ja-color-neutral-300);
  }

  .title {
    font-size: var(--ja-font-size-x-large);
  }

  .subtitle {
    font-size: var(--ja-font-size-medium);
  }

  .action-button {
    display: flex;
    align-items: center;
    gap: var(--ja-spacing-small);
    padding: var(--ja-spacing-x-small) var(--ja-spacing-2x-large);
    border: 1px solid color-mix(in srgb, var(--ja-color-purple-400) 35%, transparent);
    border-radius: var(--ja-border-radius-pill);
    background: linear-gradient(135deg, var(--ja-color-purple-600), var(--ja-color-violet-600));
    color: var(--ja-color-neutral-0);
    font-size: var(--ja-font-size-medium);
    transition:
      box-shadow var(--ja-transition-fast) ease,
      border-color var(--ja-transition-fast) ease;

    &:hover {
      border-color: color-mix(in srgb, var(--ja-color-purple-300) 65%, transparent);
      box-shadow: 0 0 16px color-mix(in srgb, var(--ja-color-purple-400) 50%, transparent);
    }
  }

  .action-button-icon {
    width: 20px;
    height: 20px;
  }

  .portfolio-card {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .card-shadow {
    position: absolute;
    left: -20px;
    right: -20px;
    height: 0;
    transition:
      top var(--ja-transition-medium) ease,
      bottom var(--ja-transition-medium) ease;

    &:first-child {
      top: 0;
      box-shadow: 0 0 65px 20px var(--ja-color-neutral-1000);
    }

    &:last-child {
      bottom: 0;
      box-shadow: 0 0 65px 20px var(--ja-color-neutral-1000);
    }

    &:not(.active) {
      &:first-child {
        top: -70px;
      }

      &:last-child {
        bottom: -70px;
      }
    }
  }

  .card-scroller {
    padding: var(--ja-spacing-small) var(--ja-spacing-large);
    width: 100%;
    height: 500px;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none;
  }

  .project {
    display: flex;
    align-items: center;
    gap: var(--ja-spacing-medium);
    padding: var(--ja-spacing-small) var(--ja-spacing-medium);
    border-radius: var(--ja-border-radius-large);
    color: var(--ja-color-neutral-0);
    text-decoration: none;
    transition: background-color var(--ja-transition-fast) ease;

    &.expanded {
      padding-bottom: 0;

      .expand-button {
        transform: rotate(-90deg);
      }

      .project-name {
        color: var(--ja-color-neutral-0);
        font-weight: var(--ja-font-weight-semibold);
      }
    }
  }

  .expand-button {
    padding: var(--ja-spacing-x-small);
    border: none;
    border-radius: var(--ja-border-radius-circle);
    background: transparent;
    transform: rotate(90deg);
    transition:
      background-color var(--ja-transition-fast) ease,
      transform var(--ja-transition-medium) ease;

    &:hover {
      background-color: color-mix(in srgb, var(--ja-color-neutral-0) 5%, transparent);
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .project-name {
    font-size: var(--ja-font-size-medium);
    color: var(--ja-color-neutral-200);
  }

  .navigation-link {
    margin-left: auto;
    padding: var(--ja-spacing-x-small);
    color: var(--ja-color-neutral-300);
    transition:
      color var(--ja-transition-fast) ease,
      transform var(--ja-transition-fast) ease;

    &:hover {
      color: var(--ja-color-neutral-0);
      transform: scale(1.1);
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .expanded-content {
    margin: 0 var(--ja-spacing-medium);
    padding: var(--ja-spacing-small) 0 var(--ja-spacing-small) var(--ja-spacing-3x-large);
  }

  .project-description {
    display: flex;
    flex-direction: column;
    gap: var(--ja-spacing-2x-small);
    padding-bottom: var(--ja-spacing-large);
    list-style: none;

    li {
      position: relative;
      padding-left: var(--ja-spacing-medium);
      font-size: var(--ja-font-size-medium);
      color: var(--ja-color-neutral-200);

      &::before {
        position: absolute;
        left: 0;
        content: '-';
        color: var(--ja-color-purple-300);
      }
    }
  }

  .project-call-to-action {
    font-size: var(--ja-font-size-small);
    font-style: italic;
    color: var(--ja-color-neutral-300);
    text-align: right;
  }

  .divider {
    height: 1px;
    background-color: color-mix(in srgb, var(--ja-color-neutral-0) 12%, transparent);
  }
</style>
