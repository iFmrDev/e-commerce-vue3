import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import "bootstrap"
import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import axios from 'axios'
import VueAxios from 'vue-axios'
import vue3StarRatings from "vue3-star-ratings";
import './assets/main.css'
import { ref } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(faUserSecret)
library.add(fas, far, fab);

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)
app.use(router).use(store).use(VueAxios, axios).use(BootstrapVue3)
app.component("vue3-star-ratings", vue3StarRatings);
app.mount('#app')
