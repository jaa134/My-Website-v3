<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import ActionButton from '@/components/common/ActionButton.vue';
  import MainHeader from '@/components/common/MainHeader.vue';
  import SectionHeader from '@/components/common/SectionHeader.vue';
  import SelectionDisplay from '@/components/common/SelectionDisplay.vue';
  import SvgIcon from '@/components/common/SvgIcon.vue';

  /* Experience ///////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Experience {
    id: string;
    displayName?: string;
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
      id: 'Loft Orbital',
      roles: ['Staff Frontend Developer', 'Satellite Operator'],
      dateRange: 'Jan 2022 - Present',
      duration: createDurationString(new Date('2022-01-01'), new Date()),
      description: [
        'Defined frontend architecture and technical direction across multiple Vue applications, aligning shared UI systems with product strategy and execution',
        'Led a Vue 2 to Vue 3 migration across 650+ components, modernizing TypeScript usage, build tooling, and architectural patterns to reduce technical debt',
        'Redesigned the client-side data request architecture (GraphQL/Apollo) to reduce network overhead and improve caching, resulting in up to 80% faster page loads and fewer runtime bottlenecks',
        'Established a shared design system and web-component library used across multiple applications, improving accessibility, visual consistency, and development speed',
        'Mentored engineers through architectural guidance, code reviews, and pair programming, raising code quality and team velocity',
        'Introduced standardized frontend engineering workflows and quality gates (linting, formatting, PR templates), increasing team throughput and delivery predictability',
        'Partnered with operations teams to support satellite fleet health management, assisting with system assessments and anomaly response to maintain mission continuity',
      ],
    },
    {
      id: 'IBM - UrbanCode',
      roles: ['Frontend Lead', 'Full-Stack Software Engineer'],
      dateRange: 'May 2019 - Jan 2022',
      duration: createDurationString(new Date('2019-05-01'), new Date('2022-01-01')),
      description: [
        'Led the frontend team for two enterprise DevOps products built with React and GraphQL, owning UI roadmap execution, code quality, and release readiness',
        'Improved frontend performance by up to 15x by identifying and eliminating critical rendering bottlenecks',
        'Reduced the UI defect backlog by over 90% within 10 months, increasing product stability and client confidence',
        'Established release validation standards to ensure UI functionality aligned with business requirements prior to delivery',
        'Acted as a technical advocate for high-profile enterprise accounts, partnering with global teams to meet strict SLAs and protect multimillion-dollar client investments',
        'Earned Distinguished performance accreditation multiple times for sustained technical leadership',
      ],
    },
    {
      id: 'Pointe Blank Solutions',
      roles: ['Full-Stack Software Engineer'],
      dateRange: 'May 2016 - May 2019',
      duration: createDurationString(new Date('2016-05-01'), new Date('2019-05-15')),
      description: [
        'Contributed to an enterprise suite of web applications streamlining the justice process, integrating agencies across 50+ Ohio counties',
        'Built and delivered full-stack features using React, TypeScript, C#, .NET, and SQL Server, implementing CI/CD pipelines, automated tests, and robust client- and server-side functionality',
        'Optimized database queries and API endpoints, improving system performance and scalability',
      ],
    },
    {
      id: 'CWRU',
      displayName: 'Case Western Reserve',
      roles: ['Teaching Assistant', 'Peer Tutor'],
      dateRange: 'August 2016 - May 2019',
      duration: createDurationString(new Date('2016-08-01'), new Date('2019-05-15')),
      description: [
        'Led recitations and tutoring workshops for computer science and electrical engineering courses, improving student comprehension and outcomes',
        'Customized instruction to accommodate diverse learning styles and skill levels',
        'Collaborated with faculty to align lesson plans with course objectives and student needs',
        'Managed grading and records for assignments, quizzes, and exams, ensuring accuracy and timely feedback',
      ],
    },
  ];
</script>

<template>
  <div class="career-view">
    <MainHeader
      title="10 years in web-dev"
      subtitle="You'll want to see this"
    />
    <div class="line">
      <div class="line-arm"></div>
      <div class="line-arm"></div>
    </div>
    <SectionHeader
      title="Career Path"
      subtitle="All of the cool places I have worked"
    >
      <a
        href="/documents/Alspaw-Jacob-Resume.pdf"
        download
      >
        <ActionButton pulsing>
          <SvgIcon href="/icons/actions/download.svg" />
          <span>Download Resume</span>
        </ActionButton>
      </a>
    </SectionHeader>
    <SelectionDisplay
      :options="experiences"
      max-content-height="525px"
    >
      <template #default="{ selection }">
        <div class="details">
          <div class="time">
            <span class="date-range">{{ selection.dateRange }}</span>
            <span class="duration">({{ selection.duration }})</span>
          </div>
          <h3 class="company-name">{{ selection.displayName || selection.id }}</h3>
          <p class="roles">{{ selection.roles.join(' · ') }}</p>
          <ul class="description-list">
            <li
              v-for="(item, index) in selection.description"
              :key="index"
              class="description-item"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </template>
    </SelectionDisplay>
  </div>
</template>

<style scoped>
  .career-view {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1100px;
  }

  .main-header {
    &:deep(.subtitle) {
      text-decoration: underline;
      text-underline-offset: var(--ja-spacing-large);
      text-decoration-thickness: 1px;
      text-decoration-color: var(--ja-color-neutral-400);
    }
  }

  .line {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 150px;
    width: 100%;
  }

  .line-arm {
    position: absolute;
    border: 1px dashed var(--ja-color-neutral-400);

    &:first-child {
      top: 98px;
      left: 50%;
      transform: translateX(-50%);
      width: 1px;
      height: 58px;
    }

    &:last-child {
      top: 154px;
      left: calc(50% + 3px);
      width: 320px;
      height: 1px;
    }
  }

  .details {
    padding: var(--ja-spacing-3x-large);
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
    color: var(--ja-color-neutral-300);
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
      content: '•';
      font-weight: var(--ja-font-weight-bold);
      color: var(--ja-color-purple-300);
    }
  }
</style>
