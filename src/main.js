import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import ProductList from './components/ProductList.vue';

const routes = [
    { path: '/', component: ProductList },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  createApp(App)
    .use(router)
    .mount('#app');
  
