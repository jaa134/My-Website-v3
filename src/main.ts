/* Imports ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

import '@/styles/index.css';

import { createApp } from 'vue';

import router from '@/router/index.js';

import App from '@/App.vue';

/* Initialize application /////////////////////////////////////////////////////////////////////////////////////////// */
async function bootstrap() {
  const app = createApp(App);

  app.use(router);

  app.mount('body');
}

bootstrap();
