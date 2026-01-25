/* Imports ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

import mobile from 'is-mobile';
import { createApp } from 'vue';

import router from '@/common/router/index.js';

/* Initialize application /////////////////////////////////////////////////////////////////////////////////////////// */

async function bootstrap() {
  const { default: RootApp } = mobile() ? await import('@/mobile/App.vue') : await import('@/desktop/App.vue');

  const app = createApp(RootApp);

  app.use(router);

  app.mount('body');
}

bootstrap();
