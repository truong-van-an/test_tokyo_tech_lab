import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/scss/app.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.css';
import store from './state/store';


createApp(App)
    .use(store)
    .mount('#app')
