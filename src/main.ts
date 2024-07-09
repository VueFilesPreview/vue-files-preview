import App from './App.vue'
import { createApp, App as Application } from 'vue'
import Vue3Preview from '../packages/index'

const app: Application = createApp(App);

app.use(Vue3Preview);
app.mount('#app');
