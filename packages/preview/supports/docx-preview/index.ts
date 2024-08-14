import type {App as Application} from 'vue'
import DocxPreview from './index.vue'

DocxPreview.install = (app: Application) => {
    app.component('DocxPreview', DocxPreview)
}
export default DocxPreview
