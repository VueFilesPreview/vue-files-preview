import type {App as Application} from 'vue'
import AudioPreview from './index.vue'

AudioPreview.install = (app: Application) => {
    app.component('AudioPreview', AudioPreview)
}
export default AudioPreview
