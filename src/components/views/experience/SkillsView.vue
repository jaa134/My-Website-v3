<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import SectionHeader from '@/components/common/SectionHeader.vue';
  import SelectionDisplay from '@/components/common/SelectionDisplay.vue';
  import SvgIcon from '@/components/common/SvgIcon.vue';

  /* Skills ///////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Skill {
    name: string;
    icon: string;
    link: string;
  }

  interface SkillGroup {
    id: string;
    skills: Skill[];
  }

  const skillGroups: SkillGroup[] = [
    {
      id: 'Languages',
      skills: [
        {
          name: 'Bash',
          icon: '/icons/skills/bash.svg',
          link: 'https://www.gnu.org/software/bash/',
        },
        {
          name: 'C#',
          icon: '/icons/skills/cSharp.svg',
          link: 'https://dotnet.microsoft.com/',
        },
        {
          name: 'C++',
          icon: '/icons/skills/c++.svg',
          link: 'https://isocpp.org/',
        },
        {
          name: 'CSS',
          icon: '/icons/skills/css.svg',
          link: 'https://www.w3.org/Style/CSS/',
        },
        {
          name: 'GraphQL',
          icon: '/icons/skills/graphql.svg',
          link: 'https://graphql.org/',
        },
        {
          name: 'HTML',
          icon: '/icons/skills/html.svg',
          link: 'https://html.spec.whatwg.org/',
        },
        {
          name: 'Java',
          icon: '/icons/skills/java.svg',
          link: 'https://www.java.com/',
        },
        {
          name: 'JavaScript',
          icon: '/icons/skills/javaScript.svg',
          link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        },
        {
          name: 'MATLAB',
          icon: '/icons/skills/matlab.svg',
          link: 'https://www.mathworks.com/products/matlab.html',
        },
        {
          name: 'R',
          icon: '/icons/skills/r.svg',
          link: 'https://www.r-project.org/',
        },
        {
          name: 'Sass',
          icon: '/icons/skills/sass.svg',
          link: 'https://sass-lang.com/',
        },
        {
          name: 'SQL',
          icon: '/icons/skills/sql.svg',
          link: 'https://en.wikipedia.org/wiki/SQL',
        },
        {
          name: 'Swift',
          icon: '/icons/skills/swift.svg',
          link: 'https://www.swift.org/',
        },
        {
          name: 'TypeScript',
          icon: '/icons/skills/typescript.svg',
          link: 'https://www.typescriptlang.org/',
        },
      ],
    },
    {
      id: 'Technologies',
      skills: [
        {
          name: 'Ant',
          icon: '/icons/skills/ant.svg',
          link: 'https://ant.design/',
        },
        {
          name: 'Apollo',
          icon: '/icons/skills/apollo.svg',
          link: 'https://www.apollographql.com/',
        },
        {
          name: 'Babel',
          icon: '/icons/skills/babel.svg',
          link: 'https://babeljs.io/',
        },
        {
          name: 'Cesium',
          icon: '/icons/skills/cesium.svg',
          link: 'https://cesium.com/',
        },
        {
          name: 'Cursor',
          icon: '/icons/skills/cursor.svg',
          link: 'https://cursor.sh/',
        },
        {
          name: 'D3',
          icon: '/icons/skills/d3.svg',
          link: 'https://d3js.org/',
        },
        {
          name: 'Docker',
          icon: '/icons/skills/docker.svg',
          link: 'https://www.docker.com/',
        },
        {
          name: 'Dojo',
          icon: '/icons/skills/dojo.svg',
          link: 'https://dojo.io/',
        },
        {
          name: 'ESLint',
          icon: '/icons/skills/eslint.svg',
          link: 'https://eslint.org/',
        },
        {
          name: 'Express',
          icon: '/icons/skills/express.svg',
          link: 'https://expressjs.com/',
        },
        {
          name: 'Git',
          icon: '/icons/skills/git.svg',
          link: 'https://git-scm.com/',
        },
        {
          name: 'Hibernate',
          icon: '/icons/skills/hibernate.svg',
          link: 'https://hibernate.org/',
        },
        {
          name: 'IcoMoon',
          icon: '/icons/skills/icoMoon.svg',
          link: 'https://icomoon.io/',
        },
        {
          name: 'Jest',
          icon: '/icons/skills/jest.svg',
          link: 'https://jestjs.io/',
        },
        {
          name: 'jQuery',
          icon: '/icons/skills/jquery.svg',
          link: 'https://jquery.com/',
        },
        {
          name: 'Knockout',
          icon: '/icons/skills/knockout.svg',
          link: 'https://knockoutjs.com/',
        },
        {
          name: 'MongoDB',
          icon: '/icons/skills/mongoDb.svg',
          link: 'https://www.mongodb.com/',
        },
        {
          name: 'Node.js',
          icon: '/icons/skills/node.svg',
          link: 'https://nodejs.org/',
        },
        {
          name: 'npm',
          icon: '/icons/skills/npm.svg',
          link: 'https://www.npmjs.com/',
        },
        {
          name: 'OpenLayers',
          icon: '/icons/skills/openLayers.svg',
          link: 'https://openlayers.org/',
        },
        {
          name: 'Photoshop',
          icon: '/icons/skills/photoshop.svg',
          link: 'https://www.adobe.com/products/photoshop.html',
        },
        {
          name: 'Pinia',
          icon: '/icons/skills/pinia.svg',
          link: 'https://pinia.vuejs.org/',
        },
        {
          name: 'Qt',
          icon: '/icons/skills/qt.svg',
          link: 'https://www.qt.io/',
        },
        {
          name: 'Raspberry Pi',
          icon: '/icons/skills/raspberryPi.svg',
          link: 'https://www.raspberrypi.org/',
        },
        {
          name: 'React',
          icon: '/icons/skills/react.svg',
          link: 'https://react.dev/',
        },
        {
          name: 'SQL Server',
          icon: '/icons/skills/sqlServer.svg',
          link: 'https://www.microsoft.com/en-us/sql-server',
        },
        {
          name: 'Storybook',
          icon: '/icons/skills/storybook.svg',
          link: 'https://storybook.js.org/',
        },
        {
          name: 'TestCafe',
          icon: '/icons/skills/testCafe.svg',
          link: 'https://testcafe.io/',
        },
        {
          name: 'Vite',
          icon: '/icons/skills/vite.svg',
          link: 'https://vitejs.dev/',
        },
        {
          name: 'Vitest',
          icon: '/icons/skills/vitest.svg',
          link: 'https://vitest.dev/',
        },
        {
          name: 'Visual Studio',
          icon: '/icons/skills/visualStudio.svg',
          link: 'https://visualstudio.microsoft.com/',
        },
        {
          name: 'Vue',
          icon: '/icons/skills/vue.svg',
          link: 'https://vuejs.org/',
        },
        {
          name: 'Webpack',
          icon: '/icons/skills/webpack.svg',
          link: 'https://webpack.js.org/',
        },
        {
          name: 'Yarn',
          icon: '/icons/skills/yarn.svg',
          link: 'https://yarnpkg.com/',
        },
      ],
    },
    {
      id: 'Services',
      skills: [
        {
          name: 'Confluence',
          icon: '/icons/skills/confluence.svg',
          link: 'https://www.atlassian.com/software/confluence',
        },
        {
          name: 'Figma',
          icon: '/icons/skills/figma.svg',
          link: 'https://www.figma.com/',
        },
        {
          name: 'GitHub',
          icon: '/icons/skills/gitHub.svg',
          link: 'https://github.com/',
        },
        {
          name: 'Gitlab',
          icon: '/icons/skills/gitlab.svg',
          link: 'https://about.gitlab.com/',
        },
        {
          name: 'Jenkins',
          icon: '/icons/skills/jenkins.svg',
          link: 'https://www.jenkins.io/',
        },
        {
          name: 'Jira',
          icon: '/icons/skills/jira.svg',
          link: 'https://www.atlassian.com/software/jira',
        },
        {
          name: 'Salesforce',
          icon: '/icons/skills/salesforce.svg',
          link: 'https://www.salesforce.com/',
        },
        {
          name: 'Slack',
          icon: '/icons/skills/slack.svg',
          link: 'https://slack.com/',
        },
        {
          name: 'SonarQube',
          icon: '/icons/skills/sonarQube.svg',
          link: 'https://www.sonarqube.org/',
        },
        {
          name: 'Teams',
          icon: '/icons/skills/teams.svg',
          link: 'https://www.microsoft.com/en-us/microsoft-teams/group-chat-software',
        },
      ],
    },
  ];
</script>

<template>
  <div class="skills-view">
    <SectionHeader
      title="Skills"
      subtitle="The tools and technologies I've used"
    />
    <SelectionDisplay
      :options="skillGroups"
      min-content-height="384px"
      max-content-height="525px"
    >
      <template #default="{ selection }">
        <div class="skills-grid">
          <a
            v-for="skill in selection.skills"
            :key="skill.name"
            class="skill-item"
            :href="skill.link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SvgIcon
              class="skill-icon"
              :href="skill.icon"
            />
            <span class="skill-name">{{ skill.name }}</span>
          </a>
        </div>
      </template>
    </SelectionDisplay>
  </div>
</template>

<style scoped>
  .skills-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1100px;
  }

  .skills-grid {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 130px);
    gap: var(--ja-spacing-x-small);
    padding: var(--ja-spacing-x-large) var(--ja-spacing-large);
  }

  .skill-item {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--ja-spacing-medium);
    padding: var(--ja-spacing-medium);
    border-radius: var(--ja-border-radius-x-large);
    transition: background-color var(--ja-transition-fast) ease;

    &:hover {
      background-color: color-mix(in srgb, var(--ja-color-purple-400) 15%, transparent);

      .skill-name {
        color: var(--ja-color-neutral-0);
      }
    }
  }

  .skill-icon {
    width: 80px;
    height: 40px;
  }

  .skill-name {
    font-size: var(--ja-font-size-medium);
    font-weight: var(--ja-font-weight-normal);
    line-height: var(--ja-line-height-denser);
    color: var(--ja-color-neutral-200);
    transition: color var(--ja-transition-fast) ease;
  }
</style>
