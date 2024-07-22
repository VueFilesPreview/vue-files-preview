import AudioPreview from './index.vue';
import { App as Application } from 'vue'
AudioPreview.install = (app: Application) => {
  app.component("AudioPreview", AudioPreview);
};
export default AudioPreview;
