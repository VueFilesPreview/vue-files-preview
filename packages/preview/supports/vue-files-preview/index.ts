import VueFilesPreview from './index.vue';
import { App as Application } from 'vue'
VueFilesPreview.install = (app: Application) => {
  app.component("VueFilesPreview", VueFilesPreview);
};
export default VueFilesPreview;
