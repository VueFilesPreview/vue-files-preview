import PdfPreview from './index.vue';
import { App as Application } from 'vue'
PdfPreview.install = (app: Application) => {
  app.component("PdfPreview", PdfPreview);
};
export default PdfPreview;
