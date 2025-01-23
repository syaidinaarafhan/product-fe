import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import ProductList from './components/ProductList.vue';
import ProductForm from './components/ProductForm.vue';

const routes = [
    { path: '/', component: ProductList },
    { path: '/add-product', component: ProductForm },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  createApp(App)
    .use(router)
    .mount('#app');
  
