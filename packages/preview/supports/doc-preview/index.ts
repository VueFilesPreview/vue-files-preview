import DocPreview from './index.vue';
import { App as Application } from 'vue'
DocPreview.install = (app: Application) => {
  app.component("DocPreview", DocPreview);
};
export default DocPreview;
