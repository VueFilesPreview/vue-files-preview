import type {App as Application} from 'vue'
import EpubPreview from './index.vue'

EpubPreview.install = (app: Application) => {
    app.component('EpubPreview', EpubPreview)
}
export default EpubPreview
