import MdPreview from './index.vue';
import { App as Application } from 'vue'
MdPreview.install = (app: Application) => {
  app.component("MdPreview", MdPreview);
};
export default MdPreview;
