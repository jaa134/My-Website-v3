<script setup lang="ts">
  /* Imorts ///////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import SvgIcon from '@/components/common/SvgIcon.vue';

  /* Links ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Link {
    name: string;
    link: string;
  }

  interface LinkCategory {
    name: string;
    links: Link[];
  }

  const linkCategories: LinkCategory[] = [
    {
      name: 'Repos',
      links: [
        {
          name: 'Legacy Website',
          link: 'https://legacy.jacob-alspaw.com/',
        },
        {
          name: 'Word Games',
          link: 'https://wordgames.jacob-alspaw.com/',
        },
        {
          name: 'Norad Track',
          link: 'https://noradtrack.jacob-alspaw.com/',
        },
      ],
    },
    {
      name: 'Tech Blogs',
      links: [
        {
          name: 'Frontend Weekly',
          link: 'https://frontendweekly.co/',
        },
        {
          name: 'Stack Overflow',
          link: 'https://stackoverflow.com/questions/tagged/frontend',
        },
        {
          name: 'Reddit',
          link: 'https://www.reddit.com/r/Frontend/',
        },
      ],
    },
    {
      name: 'News',
      links: [
        {
          name: 'MDC Climb',
          link: 'https://mdc.mo.gov/newsroom/mdc-opens-first-public-outdoor-rock-climbing-bluff-st-louis-area-rockwoods-reservation',
        },
        {
          name: 'College Swim',
          link: 'https://athletics.case.edu/sports/mswimdive/2014-15/bios/alspaw_jacob_y49p',
        },
        {
          name: 'Open Water',
          link: 'https://www.newsmagazinenetwork.com/nn/2013052235407/rockwood-swim-club-places-11th-at-open-water-festival/',
        },
      ],
    },
  ];

  /* Socials //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  interface Social {
    name: string;
    link: string;
    icon: string;
  }

  const socials: Social[] = [
    {
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/jacob-alspaw',
      icon: '/icons/socials/linkedin.svg',
    },
    {
      name: 'GitHub',
      link: 'https://github.com/jaa134',
      icon: '/icons/socials/github.svg',
    },
    {
      name: 'Facebook',
      link: 'https://www.facebook.com/jacobalexander.alspaw',
      icon: '/icons/socials/facebook.svg',
    },
    {
      name: 'Instagram',
      link: 'https://www.instagram.com/jacobalspaw/',
      icon: '/icons/socials/instagram.svg',
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com/JacobAlspaw',
      icon: '/icons/socials/twitter.svg',
    },
  ];
</script>

<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div
        v-for="linkCategory in linkCategories"
        :key="linkCategory.name"
        class="column"
      >
        <h3 class="column-title">{{ linkCategory.name }}</h3>
        <ul class="column-links">
          <li
            v-for="link in linkCategory.links"
            :key="link.name"
          >
            <a
              :href="link.link"
              target="_blank"
              rel="noopener noreferrer"
              >{{ link.name }}</a
            >
          </li>
        </ul>
      </div>
      <div class="column">
        <h3 class="column-title">Contact</h3>
        <div class="contact-content">
          <p class="contact-description">Want to get in touch? Here's how you can reach me.</p>
          <div class="social-icons">
            <a
              v-for="social in socials"
              :key="social.name"
              class="social-icon"
              :href="social.link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SvgIcon :href="social.icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  .app-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 280px;
    background-color: var(--ja-color-purple-900);
    color: var(--ja-color-neutral-0);
  }

  .footer-content {
    display: grid;
    grid-template-columns: repeat(4, 285px);
    align-items: flex-start;
    margin: 0 auto;
    max-width: 1400px;
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: var(--ja-spacing-large);
  }

  .column-title {
    font-size: var(--ja-font-size-medium);
    font-weight: var(--ja-font-weight-bold);
    letter-spacing: var(--ja-letter-spacing-looser);
    text-transform: uppercase;
    color: var(--ja-color-neutral-0);
    padding-bottom: var(--ja-spacing-2x-small);
  }

  .column-links {
    display: flex;
    flex-direction: column;
    gap: var(--ja-spacing-small);
    list-style: none;

    a {
      display: inline-block;
      font-size: var(--ja-font-size-medium);
      color: var(--ja-color-neutral-200);
      text-decoration: none;
      transition: color var(--ja-transition-fast) ease;

      &:hover {
        color: var(--ja-color-neutral-0);
      }
    }
  }

  .contact-description {
    font-size: var(--ja-font-size-small);
    line-height: var(--ja-line-height-dense);
    color: var(--ja-color-neutral-300);
    padding-bottom: var(--ja-spacing-large);
  }

  .social-icons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ja-spacing-medium);
    padding-top: var(--ja-spacing-2x-small);
  }

  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background-color: color-mix(in srgb, var(--ja-color-neutral-0) 8%, transparent);
    border: 1px solid color-mix(in srgb, var(--ja-color-neutral-0) 10%, transparent);
    border-radius: var(--ja-border-radius-medium);
    color: var(--ja-color-neutral-0);
    text-decoration: none;
    transition: background-color var(--ja-transition-fast) ease;

    &:hover {
      background-color: color-mix(in srgb, var(--ja-color-neutral-0) 15%, transparent);
      border-color: color-mix(in srgb, var(--ja-color-neutral-0) 20%, transparent);
    }

    .svg-icon {
      width: 22px;
      height: 22px;
      color: var(--ja-color-neutral-0);
    }
  }
</style>
