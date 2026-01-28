/* Imports ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

import '@/styles/index.css';

import FloatingVue from 'floating-vue';
import { createApp } from 'vue';

import router from '@/router/index.js';

import App from '@/App.vue';

/* Initialize application /////////////////////////////////////////////////////////////////////////////////////////// */
async function bootstrap() {
  const app = createApp(App);

  app.use(router);
  app.use(FloatingVue);

  app.mount('body');
}

bootstrap();
