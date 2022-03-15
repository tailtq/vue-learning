import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import PastOrders from '../views/PastOrders.vue';
import AllProducts from '../views/AllProducts.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/products',
    name: 'products',
    component: AllProducts,
  },
  {
    path: '/past-orders',
    name: 'past-orders',
    component: PastOrders,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
