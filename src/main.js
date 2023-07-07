import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from "axios";
import mitt from 'mitt';

loadFonts()

const emitter = mitt();
const app = createApp(App)
app.config.globalProperties.emitter = emitter
app.config.globalProperties.axios = axios;
app.config.globalProperties.$emiiter = emitter;
app.use(router)
app.use(store)
app.use(vuetify)
app.use(mitt)
app.mount('#app')
