import DocxPreview from './index.vue';
import { App as Application } from 'vue'
DocxPreview.install = (app: Application) => {
  app.component("DocxPreview", DocxPreview);
};
export default DocxPreview;
