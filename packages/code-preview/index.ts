import CodePreview from './index.vue';
import { App as Application } from 'vue'
CodePreview.install = (app: Application) => {
  app.component("CodePreview", CodePreview);
};
export default CodePreview;
