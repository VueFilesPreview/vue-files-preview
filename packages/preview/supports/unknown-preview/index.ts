import type { App as Application } from 'vue'
import UnknownPreview from './index.vue'

UnknownPreview.install = (app: Application) => {
    app.component('UnknownPreview', UnknownPreview)
}
export default UnknownPreview
