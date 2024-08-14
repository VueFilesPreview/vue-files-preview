import type {App as Application} from 'vue'
import VueFilesPreview from './index.vue'

VueFilesPreview.install = (app: Application) => {
    app.component('VueFilesPreview', VueFilesPreview)
}
export default VueFilesPreview
