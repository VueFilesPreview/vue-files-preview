import type {App as Application} from 'vue'
import PptPreview from './index.vue'

PptPreview.install = (app: Application) => {
    app.component('PptPreview', PptPreview)
}
export default PptPreview
