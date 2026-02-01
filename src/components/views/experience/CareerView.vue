<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import DownloadIcon from '@/assets/icons/actions/download.svg';

  import ActionButton from '@/components/common/ActionButton.vue';
  import SectionHeader from '@/components/common/SectionHeader.vue';
  import SelectionDisplay from '@/components/common/SelectionDisplay.vue';

  /* Experience ///////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Experience {
    id: string;
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
        'Led frontend architecture and technical direction, delivering complex cross-application initiatives',
        'Re-architected data-fetching layer, cutting page load times and runtime bottlenecks by up to 80%',
        'Migrated 650+ components from Vue 2 to Vue 3, modernizing tooling and reducing maintenance risk',
        'Designed and launched a shared design system and component library, improving accessibility and accelerating feature delivery',
        'Standardized delivery processes and mentored engineers to boost productivity, code quality, and team velocity',
        'Supported satellite fleet health management by assisting with anomaly response to maintain mission continuity',
      ],
    },
    {
      id: 'IBM - UrbanCode',
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
      id: 'Matrix Pointe',
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
      id: 'CWRU',
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
</script>

<template>
  <div class="career-view">
    <div class="title">You'll want to see this</div>
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
          <DownloadIcon />
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
          <h3 class="company-name">{{ selection.id }}</h3>
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

  .title {
    margin-bottom: var(--ja-spacing-large);
    font-size: var(--ja-font-size-2x-large);
    font-weight: var(--ja-font-weight-light);
    color: var(--ja-color-neutral-200);
    text-decoration: underline;
    text-underline-offset: var(--ja-spacing-medium);
    text-decoration-thickness: 1px;
    text-decoration-color: var(--ja-color-neutral-400);
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
      top: 65px;
      left: 50%;
      transform: translateX(-50%);
      width: 1px;
      height: 54px;
    }

    &:last-child {
      top: 117px;
      left: calc(50% + 3px);
      width: 304px;
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
      content: '•';
      font-weight: var(--ja-font-weight-bold);
      color: var(--ja-color-purple-300);
    }
  }
</style>
