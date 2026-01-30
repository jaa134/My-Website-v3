<script setup lang="ts">
  /* Imorts ///////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { shallowRef } from 'vue';

  import DownloadIcon from '@/assets/icons/actions/download.svg';

  import ActionButton from '@/components/common/ActionButton.vue';
  import BasicCard from '@/components/common/BasicCard.vue';

  /* Experience ///////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Experience {
    company: string;
    roles: string[];
    dateRange: string;
    duration: string;
    description: string[];
  }

  const createDurationString = (startDate: Date, endDate: Date) => {
    const duration = endDate.getTime() - startDate.getTime();
    const years = duration / (1000 * 60 * 60 * 24 * 365);
    return `~${Math.round(years * 2) / 2} years`;
  };

  const experiences: Experience[] = [
    {
      company: 'Loft Orbital',
      roles: ['Staff Frontend Developer', 'Satellite Operator'],
      dateRange: 'Jan 2022 - Present',
      duration: createDurationString(new Date('2022-01-01'), new Date()),
      description: [
        'Led frontend architecture and technical direction, delivering complex cross-application initiatives',
        'Re-architected data-fetching layer, cutting page load times and runtime bottlenecks by up to 80%',
        'Migrated 650+ components from Vue 2 to Vue 3, modernizing tooling and reducing maintenance risk',
        'Designed and launched a shared design system and component library, improving accessibility and accelerating feature delivery',
        'Standardized delivery processes and mentored engineers to boost productivity, code quality, and team velocity',
        'Supported satellite fleet health management by assisting with anomaly response to maintain mission continuity',
      ],
    },
    {
      company: 'IBM - UrbanCode',
      roles: ['Frontend Lead', 'Full-Stack Software Engineer'],
      dateRange: 'May 2019 - Jan 2022',
      duration: createDurationString(new Date('2019-05-01'), new Date('2022-01-01')),
      description: [
        'Led the frontend team for two enterprise DevOps products (IBM/HCL), owning roadmap execution, code quality, and release readiness',
        'Diagnosed and eliminated performance bottlenecks, achieving up to 125x faster page rendering',
        'Cut known UI defects in the backlog by over 90% within 10 months, strengthening client relationships',
        'Partnered with global support to meet SLAs, troubleshoot complex issues, and advocate for high-profile client accounts',
        'Earned Distinguished accreditation in all performance reviews',
      ],
    },
    {
      company: 'Matrix Pointe',
      roles: ['Full-Stack Software Engineer'],
      dateRange: 'May 2016 - May 2019',
      duration: createDurationString(new Date('2016-05-01'), new Date('2019-05-15')),
      description: [
        'Developed enterprise web applications streamlining the justice process across 50+ Ohio counties',
        'Worked with C#, .NET, SQL Server, JavaScript/TypeScript, HTML5/CSS3, jQuery, and CI/CD pipelines',
        'Implemented meaningful changes in complex codebases with peer reviews and pair programming to ensure reliability',
        'Built automated tests and optimized performance for scalable, maintainable software',
        'Created internal tools to improve developer workflow, reporting, and process automation',
      ],
    },
    {
      company: 'CWRU',
      roles: ['Teaching Assistant', 'Peer Tutor'],
      dateRange: 'August 2016 - May 2019',
      duration: createDurationString(new Date('2016-08-01'), new Date('2019-05-15')),
      description: [
        'Led recitations and tutoring workshops to reinforce coursework and improve student outcomes across multiple computer science and electrical engineering courses',
        'Tailored instruction to a diverse set of learning needs',
        "Collaborated with faculty to align lesson plans with students' strengths and weaknesses",
        'Graded assignments, quizzes, and exams while maintaining accurate records in university systems',
      ],
    },
  ];

  const selectedExperience = shallowRef<Experience>(experiences[0]!);

  const selectExperience = (experience: Experience) => {
    selectedExperience.value = experience;
  };
</script>

<template>
  <div class="career-view">
    <div class="header">
      <div class="header-text">
        <h2 class="title">Career Path</h2>
        <h3 class="subtitle">All of the cool places I have worked</h3>
      </div>
      <div class="header-actions">
        <a
          href="/documents/Alspaw-Jacob-Resume.pdf"
          download
        >
          <ActionButton>
            <DownloadIcon />
            <span>Download Resume</span>
          </ActionButton>
        </a>
      </div>
    </div>
    <div class="career-content">
      <BasicCard class="navigation-panel">
        <button
          v-for="experience in experiences"
          :key="experience.company"
          :class="['navigation-item', { active: selectedExperience.company === experience.company }]"
          @click="selectExperience(experience)"
        >
          <div class="selection-indicator">
            <div class="selection-indicator-fill"></div>
          </div>
          <span class="selection-text">{{ experience.company }}</span>
        </button>
      </BasicCard>
      <BasicCard class="details-panel">
        <div class="time">
          <span class="date-range">{{ selectedExperience.dateRange }}</span>
          <span class="duration">({{ selectedExperience.duration }})</span>
        </div>
        <h3 class="company-name">{{ selectedExperience.company }}</h3>
        <p class="roles">{{ selectedExperience.roles.join(' · ') }}</p>
        <ul class="description-list">
          <li
            v-for="(item, index) in selectedExperience.description"
            :key="index"
            class="description-item"
          >
            {{ item }}
          </li>
        </ul>
      </BasicCard>
    </div>
  </div>
</template>

<style scoped>
  .career-view {
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

  .career-content {
    display: grid;
    grid-template-columns: 300px 1fr;
    align-items: flex-start;
    gap: var(--ja-spacing-2x-large);
    width: 100%;
  }

  .navigation-panel {
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

  .details-panel {
    padding: var(--ja-spacing-3x-large);
    min-height: 400px;
  }

  .time {
    display: flex;
    align-items: center;
    gap: var(--ja-spacing-medium);
    margin-bottom: var(--ja-spacing-small);
  }

  .date-range,
  .duration {
    font-family: var(--ja-font-mono);
    font-size: var(--ja-font-size-medium);
    font-weight: var(--ja-font-weight-medium);
  }

  .date-range {
    color: var(--ja-color-teal-400);
  }

  .duration {
    color: var(--ja-color-neutral-300);
  }

  .company-name {
    font-family: var(--ja-font-mono);
    font-size: var(--ja-font-size-2x-large);
    font-weight: var(--ja-font-weight-medium);
    color: var(--ja-color-purple-300);
    margin-bottom: var(--ja-spacing-small);
  }

  .roles {
    font-size: var(--ja-font-size-large);
    font-weight: var(--ja-font-weight-light);
    color: var(--ja-color-neutral-100);
  }

  .description-list {
    display: flex;
    flex-direction: column;
    gap: var(--ja-spacing-medium);
    list-style: none;
    margin: var(--ja-spacing-medium) 0 0 0;
    padding: 0;
  }

  .description-item {
    position: relative;
    padding-left: var(--ja-spacing-large);
    font-size: var(--ja-font-size-medium);
    color: var(--ja-color-neutral-200);

    &::before {
      position: absolute;
      left: 0;
      content: '-';
      color: var(--ja-color-purple-300);
    }
  }
</style>
