/* Imports ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

import mobile from 'is-mobile';
import { AsyncComponentLoader } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

/* Components /////////////////////////////////////////////////////////////////////////////////////////////////////// */

interface ComponentRegistry {
  home: AsyncComponentLoader;
  about: AsyncComponentLoader;
  experience: AsyncComponentLoader;
  contact: AsyncComponentLoader;
}

const mobileComponentRegistry: ComponentRegistry = {
  home: () => import('@/mobile/pages/HomePage.vue'),
  about: () => import('@/mobile/pages/AboutPage.vue'),
  experience: () => import('@/mobile/pages/ExperiencePage.vue'),
  contact: () => import('@/mobile/pages/ContactPage.vue'),
};

const desktopComponentRegistry: ComponentRegistry = {
  home: () => import('@/desktop/pages/HomePage.vue'),
  about: () => import('@/desktop/pages/AboutPage.vue'),
  experience: () => import('@/desktop/pages/ExperiencePage.vue'),
  contact: () => import('@/desktop/pages/ContactPage.vue'),
};

const componentRegistry = mobile() ? mobileComponentRegistry : desktopComponentRegistry;

/* Routes /////////////////////////////////////////////////////////////////////////////////////////////////////////// */

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: componentRegistry.home,
  },
  {
    path: '/about',
    name: 'About',
    component: componentRegistry.about,
  },
  {
    path: '/experience',
    name: 'Experience',
    component: componentRegistry.experience,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: componentRegistry.contact,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/',
  },
];

/* Router /////////////////////////////////////////////////////////////////////////////////////////////////////////// */

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
