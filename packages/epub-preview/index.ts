import EpubPreview from './index.vue';
import { App as Application } from 'vue'
EpubPreview.install = (app: Application) => {
  app.component("EpubPreview", EpubPreview);
};
export default EpubPreview;
