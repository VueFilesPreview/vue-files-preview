import type {App as Application} from 'vue'
import VideoPreview from './index.vue'

VideoPreview.install = (app: Application) => {
    app.component('VideoPreview', VideoPreview)
}
export default VideoPreview
