import type {App as Application} from 'vue'
import PicPreview from './index.vue'

PicPreview.install = (app: Application) => {
    app.component('PicPreview', PicPreview)
}
export default PicPreview
