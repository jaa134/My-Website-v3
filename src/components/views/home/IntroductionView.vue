<script setup lang="ts"></script>

<template>
  <section class="introduction-view">
    <div class="hero-section">
      <div class="hero-text">
        <div class="status-indicator">
          <span class="status-dot"></span>
          <span class="status-text">ONLINE</span>
        </div>
        <h1 class="hero-title">
          <span class="title-name">Jacob Alspaw</span>
          <span class="title-divider"></span>
          <span class="title-roles"> Frontend Developer · Frontend Lead · Satellite Operator </span>
        </h1>
        <p class="hero-subtitle">Building digital experiences on Earth and monitoring systems in orbit</p>
      </div>
      <div class="hero-photo">
        <!-- Photo placeholder - add your image here -->
        <div class="photo-placeholder">
          <div class="photo-frame"></div>
        </div>
      </div>
    </div>

    <div class="roles-section">
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
          <h3 class="role-title">Frontend Lead</h3>
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
  </section>
</template>

<style scoped>
  .introduction-view {
    display: flex;
    flex-direction: column;
    gap: var(--ja-spacing-4x-large);
  }

  .hero-section {
    display: grid;
    grid-template-columns: 1fr 300px;
    align-items: center;
    gap: var(--ja-spacing-4x-large);
    margin: 0 auto;
    padding: var(--ja-spacing-4x-large) 0;
    max-width: 1000px;
  }

  .hero-text {
    display: flex;
    flex-direction: column;
  }

  .status-indicator {
    display: flex;
    align-items: center;
    gap: var(--ja-spacing-small);
    margin-bottom: var(--ja-spacing-2x-large);
    font-family: var(--ja-font-mono);
    font-size: var(--ja-font-size-small);
    letter-spacing: var(--ja-letter-spacing-loose);
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--ja-color-emerald-400);
    animation: pulse 2s ease-in-out infinite;
    margin-bottom: var(--ja-spacing-3x-small);
  }

  .status-text {
    color: var(--ja-color-emerald-300);
    opacity: 0.8;
  }

  .hero-title {
    display: flex;
    flex-direction: column;
    gap: var(--ja-spacing-medium);
    margin-bottom: var(--ja-spacing-large);
    font-size: var(--ja-font-size-3x-large);
    font-weight: var(--ja-font-weight-light);
    line-height: var(--ja-line-height-dense);
    color: var(--ja-color-neutral-100);
  }

  .title-name {
    font-family: var(--ja-font-mono);
  }

  .title-divider {
    width: 200px;
    height: 1px;
    background: linear-gradient(to right, var(--ja-color-violet-700), transparent);
    margin: var(--ja-spacing-small) 0;
  }

  .title-roles {
    font-family: var(--ja-font-mono);
    font-size: var(--ja-font-size-large);
    font-weight: var(--ja-font-weight-light);
    color: var(--ja-color-violet-300);
  }

  .hero-subtitle {
    font-size: var(--ja-font-size-medium);
    font-weight: var(--ja-font-weight-light);
    color: var(--ja-color-neutral-300);
  }

  .hero-photo {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .photo-placeholder {
    width: 100%;
    aspect-ratio: 1;
    max-width: 300px;
    position: relative;
  }

  .photo-frame {
    width: 100%;
    height: 100%;
    border: 2px solid color-mix(in srgb, var(--ja-color-violet-400) 20%, transparent);
    border-radius: var(--ja-border-radius-large);
    background: color-mix(in srgb, var(--ja-color-violet-950) 20%, transparent);
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        color-mix(in srgb, var(--ja-color-violet-400) 5%, transparent) 0%,
        transparent 50%,
        color-mix(in srgb, var(--ja-color-purple-500) 5%, transparent) 100%
      );
    }
  }

  .photo-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--ja-border-radius-large);
    border: 2px solid color-mix(in srgb, var(--ja-color-violet-400) 20%, transparent);
  }

  .roles-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--ja-spacing-3x-large);
  }

  .role-card {
    background: color-mix(in srgb, var(--ja-color-violet-900) 75%, transparent);
    border: 1px solid color-mix(in srgb, var(--ja-color-violet-400) 15%, transparent);
    border-radius: var(--ja-border-radius-large);
    padding: var(--ja-spacing-3x-large);
    transition: all 0.3s ease;
    position: relative;
    backdrop-filter: blur(10px);

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
      transform: translateY(-2px);

      &::before {
        opacity: 1;
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
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
      box-shadow: 0 0 8px color-mix(in srgb, var(--ja-color-emerald-400) 60%, transparent);
    }
    50% {
      opacity: 0.75;
      box-shadow: 0 0 12px color-mix(in srgb, var(--ja-color-emerald-400) 80%, transparent);
    }
  }
</style>
