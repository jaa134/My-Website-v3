/* Imports ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

import { setRouterLoading } from '@/composables/useRouterLoading.js';

/* Routes /////////////////////////////////////////////////////////////////////////////////////////////////////////// */

export enum Route {
  Home = 'Home',
  About = 'About',
  Experience = 'Experience',
  Contact = 'Contact',
  NotFound = 'NotFound',
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: Route.Home,
    component: () => import('@/components/pages/HomePage.vue'),
  },
  {
    path: '/about',
    name: Route.About,
    component: () => import('@/components/pages/AboutPage.vue'),
  },
  {
    path: '/experience',
    name: Route.Experience,
    component: () => import('@/components/pages/ExperiencePage.vue'),
  },
  {
    path: '/contact',
    name: Route.Contact,
    component: () => import('@/components/pages/ContactPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: Route.NotFound,
    redirect: { name: Route.Home },
  },
];

/* Router initialization //////////////////////////////////////////////////////////////////////////////////////////// */

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(() => {
  setRouterLoading(true);
});

router.afterEach(() => {
  setRouterLoading(false);
});

export default router;
