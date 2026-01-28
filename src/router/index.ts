/* Imports ////////////////////////////////////////////////////////////////////////////////////////////////////////// */

import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

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
    redirect: '/',
  },
];

/* Router initialization //////////////////////////////////////////////////////////////////////////////////////////// */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
