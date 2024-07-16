import XlsxPreview from './index.vue';
import { App as Application } from 'vue'
XlsxPreview.install = (app: Application) => {
  app.component("XlsxPreview", XlsxPreview);
};
export default XlsxPreview;
