import VideoPreview from './index.vue';
import { App as Application } from 'vue'
VideoPreview.install = (app: Application) => {
  app.component("VideoPreview", VideoPreview);
};
export default VideoPreview;
