// src/main.ts
import { createApp } from 'vue';
import './assets/main.scss'
import App from './App.vue';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');
