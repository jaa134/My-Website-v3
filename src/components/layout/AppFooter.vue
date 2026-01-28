<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import FacebookIcon from '@/assets/icons/socials/facebook.svg';
  import GithubIcon from '@/assets/icons/socials/github.svg';
  import InstagramIcon from '@/assets/icons/socials/instagram.svg';
  import LinkedinIcon from '@/assets/icons/socials/linkedin.svg';
  import TwitterIcon from '@/assets/icons/socials/twitter.svg';
</script>

<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="column">
        <h3 class="column-title">Repos</h3>
        <ul class="column-links">
          <li>
            <a
              href="https://legacy.jacob-alspaw.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Legacy Website
            </a>
          </li>
          <li>
            <a
              href="https://wordgames.jacob-alspaw.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Word Games
            </a>
          </li>
          <li>
            <a
              href="https://planetplanner.jacob-alspaw.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Planet Planner
            </a>
          </li>
        </ul>
      </div>
      <div class="column">
        <h3 class="column-title">Tech Blogs</h3>
        <ul class="column-links">
          <li>
            <a
              href="https://frontendweekly.co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Frontend Weekly
            </a>
          </li>
          <li>
            <a
              href="https://stackoverflow.com/questions/tagged/frontend"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stack Overflow
            </a>
          </li>
          <li>
            <a
              href="https://www.reddit.com/r/Frontend/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reddit
            </a>
          </li>
        </ul>
      </div>
      <div class="column">
        <h3 class="column-title">News</h3>
        <ul class="column-links">
          <li>
            <a
              href="https://mdc.mo.gov/newsroom/mdc-opens-first-public-outdoor-rock-climbing-bluff-st-louis-area-rockwoods-reservation"
              target="_blank"
              rel="noopener noreferrer"
            >
              MDC Climb
            </a>
          </li>
          <li>
            <a
              href="https://athletics.case.edu/sports/mswimdive/2014-15/bios/alspaw_jacob_y49p"
              target="_blank"
              rel="noopener noreferrer"
            >
              College Swim
            </a>
          </li>
          <li>
            <a
              href="https://www.newsmagazinenetwork.com/nn/2013052235407/rockwood-swim-club-places-11th-at-open-water-festival/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Water
            </a>
          </li>
        </ul>
      </div>
      <div class="column">
        <h3 class="column-title">Contact</h3>
        <div class="contact-content">
          <p class="contact-description">Want to get in touch? Here's how you can reach me.</p>
          <div class="social-icons">
            <a
              class="social-icon"
              href="https://www.linkedin.com/in/jacob-alspaw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon />
            </a>
            <a
              class="social-icon"
              href="https://github.com/jaa134"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon />
            </a>
            <a
              class="social-icon"
              href="https://www.facebook.com/jacobalexander.alspaw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
            </a>
            <a
              class="social-icon"
              href="https://www.instagram.com/jacobalspaw/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon />
            </a>
            <a
              class="social-icon"
              href="https://twitter.com/JacobAlspaw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon />
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

    svg {
      width: 22px;
      height: 22px;
      color: var(--ja-color-neutral-0);
    }
  }
</style>
