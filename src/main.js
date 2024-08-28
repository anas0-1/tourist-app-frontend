import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/main.css'; 
import axios from 'axios';


createApp(App).use(router).use(store).mount('#app');
axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

