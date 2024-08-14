import type {App as Application} from 'vue'
import TxtPreview from './index.vue'

TxtPreview.install = (app: Application) => {
    app.component('TxtPreview', TxtPreview)
}
export default TxtPreview
