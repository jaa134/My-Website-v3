<script setup lang="ts"></script>

<template>
  <div class="roles-view">
    <div class="role-card">
      <div class="role-header">
        <div class="role-indicator"></div>
        <h3 class="role-title">Frontend Developer</h3>
      </div>
      <p class="role-description">
        Crafting intuitive user interfaces with modern web technologies. Transforming designs into responsive,
        performant applications.
      </p>
    </div>

    <div class="role-card">
      <div class="role-header">
        <div class="role-indicator"></div>
        <h3 class="role-title">Team Lead</h3>
      </div>
      <p class="role-description">
        Leading development teams and architecting scalable solutions. Mentoring developers and driving technical
        excellence.
      </p>
    </div>

    <div class="role-card">
      <div class="role-header">
        <div class="role-indicator"></div>
        <h3 class="role-title">Satellite Operator</h3>
      </div>
      <p class="role-description">
        Operating satellites and monitoring space systems. Bridging the gap between Earth and orbit.
      </p>
    </div>
  </div>
</template>

<style scoped>
  .roles-view {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--ja-spacing-3x-large);
    max-width: 1200px;
  }

  .role-card {
    position: relative;
    background: color-mix(in srgb, var(--ja-color-violet-800) 50%, transparent);
    backdrop-filter: blur(10px);
    border: 1px solid color-mix(in srgb, var(--ja-color-violet-400) 15%, transparent);
    border-radius: var(--ja-border-radius-large);
    padding: var(--ja-spacing-3x-large);
    transition: all var(--ja-transition-fast) ease;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(
        to right,
        transparent,
        color-mix(in srgb, var(--ja-color-violet-400) 90%, transparent),
        transparent
      );
      opacity: 0;
      transition: opacity var(--ja-transition-fast) ease;
    }

    &:hover {
      border-color: color-mix(in srgb, var(--ja-color-violet-400) 30%, transparent);
      background: color-mix(in srgb, var(--ja-color-violet-950) 40%, transparent);

      &::before {
        opacity: 1;
      }

      .role-description {
        color: var(--ja-color-neutral-300);
      }
    }
  }

  .role-header {
    display: flex;
    align-items: center;
    gap: var(--ja-spacing-medium);
    margin-bottom: var(--ja-spacing-large);
  }

  .role-indicator {
    width: 4px;
    height: 20px;
    border-radius: 2px;
    background: var(--ja-color-violet-400);
    box-shadow: 0 0 6px color-mix(in srgb, var(--ja-color-violet-400) 40%, transparent);
  }

  .role-title {
    font-family: var(--ja-font-mono);
    font-size: var(--ja-font-size-large);
    font-weight: var(--ja-font-weight-semibold);
    color: var(--ja-color-violet-200);
  }

  .role-description {
    font-size: var(--ja-font-size-medium);
    font-weight: var(--ja-font-weight-light);
    color: var(--ja-color-neutral-400);
    transition: all var(--ja-transition-fast) ease;
  }
</style>
