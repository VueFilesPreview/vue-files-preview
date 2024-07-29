import FilesPreview from './index.vue';
import { App as Application } from 'vue'
FilesPreview.install = (app: Application) => {
  app.component("FilesPreview", FilesPreview);
};
export default FilesPreview;
