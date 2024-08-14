import type {App as Application} from 'vue'
import CodePreview from './index.vue'

CodePreview.install = (app: Application) => {
    app.component('CodePreview', CodePreview)
}
export default CodePreview
