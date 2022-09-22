import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import VuePapaParse from 'vue-papa-parse'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

// CSS Import
import './index.css'

const pinia = createPinia()

// library.add(faTrash)
library.add(fas)

createApp(App)
    .use(pinia)
    .use(VuePapaParse)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
