import App from './App.vue'
import { createApp, App as Application } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {Preview} from "../packages/index";

const app: Application = createApp(App);

app.use(Preview);
app.use(ElementPlus)

app.mount('#app');
