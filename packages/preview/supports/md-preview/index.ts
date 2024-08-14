import type {App as Application} from 'vue'
import MdPreview from './index.vue'

MdPreview.install = (app: Application) => {
    app.component('MdPreview', MdPreview)
}
export default MdPreview
