import TxtPreview from './index.vue';
import { App as Application } from 'vue'
TxtPreview.install = (app: Application) => {
  app.component("TxtPreview", TxtPreview);
};
export default TxtPreview;
