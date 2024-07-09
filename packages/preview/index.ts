import Preview from './index.vue';
import { App as Application } from 'vue'
Preview.install = (app: Application) => {
  app.component("Preview", Preview);
};
export default Preview;
