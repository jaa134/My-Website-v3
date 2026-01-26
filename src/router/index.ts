/* Imports ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

/* Routes /////////////////////////////////////////////////////////////////////////////////////////////////////////// */

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/pages/HomePage.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/components/pages/AboutPage.vue'),
  },
  {
    path: '/experience',
    name: 'Experience',
    component: () => import('@/components/pages/ExperiencePage.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/components/pages/ContactPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/',
  },
];

/* Router initialization //////////////////////////////////////////////////////////////////////////////////////////// */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    // Scroll to top on route change
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
