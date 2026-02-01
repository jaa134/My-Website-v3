<script setup lang="ts">
  /* Imports //////////////////////////////////////////////////////////////////////////////////////////////////////// */

  import { Route } from '@/router/index.js';

  import ActionButton from '@/components/common/ActionButton.vue';
  import BasicCard from '@/components/common/BasicCard.vue';

  /* Facts ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  const facts = [
    'Shares birthday with name of popular gas station',
    'Won a nationally televised dance-off at a rodeo',
    'Has swam 10,000+ lifetime miles in pools',
    'Lived in Cape Town, South Africa for 7 months',
    'Hates cucumbers, but loves pickles',
  ];
</script>

<template>
  <section class="introduction-view">
    <div class="text-section">
      <h1 class="title">You're on my website!</h1>
      <p class="subtitle">But photos and text only go so far...</p>
      <div class="call-to-action">
        <router-link :to="{ name: Route.Contact }">
          <ActionButton>
            <span>Contact Me</span>
          </ActionButton>
        </router-link>
        <span>- or -</span>
        <router-link :to="{ name: Route.Experience }">
          <ActionButton>
            <span>Learn More</span>
          </ActionButton>
        </router-link>
      </div>
    </div>
    <BasicCard class="facts-section">
      <div class="facts-content">
        <div class="facts-title">Fun Facts</div>
        <ul class="facts-list">
          <li
            v-for="fact in facts"
            :key="fact"
            class="fact"
          >
            {{ fact }}
          </li>
        </ul>
      </div>
    </BasicCard>
  </section>
</template>

<style scoped>
  .introduction-view {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: var(--ja-spacing-4x-large);
    width: 1100px;
  }

  .text-section {
    justify-self: flex-end;
    text-align: right;
  }

  .title {
    font-size: var(--ja-font-size-2x-large);
    font-weight: var(--ja-font-weight-light);
    color: var(--ja-color-neutral-300);
    margin-bottom: var(--ja-spacing-small);
  }

  .subtitle {
    font-size: var(--ja-font-size-large);
    color: var(--ja-color-neutral-300);
    margin-bottom: var(--ja-spacing-2x-large);
  }

  .call-to-action {
    display: flex;
    align-items: center;
    gap: var(--ja-spacing-small);
    font-size: var(--ja-font-size-large);
    color: var(--ja-color-neutral-300);
  }

  .facts-section {
    justify-self: flex-start;
    width: 450px;
  }

  .facts-content {
    padding: var(--ja-spacing-x-large) var(--ja-spacing-2x-large);
  }

  .facts-title {
    font-family: var(--ja-font-mono);
    font-size: var(--ja-font-size-small);
    font-weight: var(--ja-font-weight-bold);
    color: var(--ja-color-purple-200);
    text-transform: uppercase;
    margin-bottom: var(--ja-spacing-2x-small);
  }

  .facts-list {
    list-style: none;
  }

  .fact {
    position: relative;
    padding-left: var(--ja-spacing-large);
    color: var(--ja-color-neutral-300);

    &::before {
      position: absolute;
      left: 0;
      content: '•';
      font-weight: var(--ja-font-weight-bold);
      color: var(--ja-color-purple-300);
    }
  }
</style>
