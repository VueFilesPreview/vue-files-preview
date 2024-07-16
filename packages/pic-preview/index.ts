import PicPreview from './index.vue';
import { App as Application } from 'vue'
PicPreview.install = (app: Application) => {
  app.component("PicPreview", PicPreview);
};
export default PicPreview;
