import XlsPreview from './index.vue';
import { App as Application } from 'vue'
XlsPreview.install = (app: Application) => {
  app.component("XlsPreview", XlsPreview);
};
export default XlsPreview;
