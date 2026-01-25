/* Imports ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

import { createApp } from 'vue'

import mobile from 'is-mobile';

/* Initialize application /////////////////////////////////////////////////////////////////////////////////////////// */

async function bootstrap() {
  const { default: RootApp } = mobile()
    ? await import('@/mobile/App.vue')
    : await import('@/desktop/App.vue')

  const app = createApp(RootApp)

  app.mount('body');
}

bootstrap()