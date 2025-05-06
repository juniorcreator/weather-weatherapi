import { createRouter, createWebHistory } from 'vue-router';
import WeatherDetails from '@/Views/WeatherDetails.vue';
import FiveDayWhether from '@/components/FiveDayWhether.vue';

const routes = [
  {
    path: '/',
    component: FiveDayWhether,
    children: [
      {
        path: '/:index',
        component: WeatherDetails,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
